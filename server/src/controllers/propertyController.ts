import {
  Amenity,
  Highlight,
  Location,
  Prisma,
  PrismaClient,
  PropertyStatus,
} from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";
import { Request, Response } from "express";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { sendVerificationEmail } from "../utils/sendVerificationEmail";

const prisma = new PrismaClient();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const getProperties = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      favoriteIds,
      priceMin,
      priceMax,
      beds,
      baths,
      propertyType,
      squareFeetMin,
      squareFeetMax,
      amenities,
      availableFrom,
      latitude,
      longitude,
      page,
      limit = "3",
    } = req.query;

    const lim = Number(limit) ?? 3;
    const pageNo = Math.max(Number(page) ?? 0, 1);
    const off = (pageNo - 1) * lim;

    let whereConditions: Prisma.Sql[] = [];

    if (favoriteIds) {
      const favoriteIdsArray = (favoriteIds as string).split(",").map(Number);

      whereConditions.push(
        Prisma.sql`p.id IN (${Prisma.join(favoriteIdsArray)})`
      );
    }

    if (priceMin) {
      whereConditions.push(
        Prisma.sql`p."pricePerMonth" >= ${Number(priceMin)}`
      );
    }
    if (priceMax) {
      whereConditions.push(
        Prisma.sql`p."pricePerMonth" <= ${Number(priceMax)}`
      );
    }
    if (beds && beds !== "any") {
      whereConditions.push(Prisma.sql`p.beds >= ${Number(beds)}`);
    }
    if (baths && baths !== "any") {
      whereConditions.push(Prisma.sql`p.baths >= ${Number(baths)}`);
    }

    if (squareFeetMin) {
      whereConditions.push(
        Prisma.sql`p."squareFeet" >= ${Number(squareFeetMin)}`
      );
    }
    if (squareFeetMax) {
      whereConditions.push(
        Prisma.sql`p."squareFeet" <= ${Number(squareFeetMax)}`
      );
    }

    if (propertyType && propertyType !== "any") {
      whereConditions.push(
        Prisma.sql`p."propertyType" = ${propertyType}::"PropertyType"`
      );
    }

    if (amenities && amenities !== "any") {
      const amenitiesArray = (amenities as string)
        .split(",")
        .map((a) => a.trim());

      // Use ARRAY[...]::"Amenity"[] without extra quotes
      whereConditions.push(
        Prisma.sql`amenities @> ARRAY[${Prisma.join(
          amenitiesArray.map((a) => Prisma.sql`${a}::"Amenity"`)
        )}]::"Amenity"[]`
      );
    }

    whereConditions.push(
      Prisma.sql`p.status = ${PropertyStatus.Approved}::"PropertyStatus"`
    );

    if (availableFrom && availableFrom !== "any") {
      const availableFromDate =
        typeof availableFrom === "string" ? availableFrom : null;

      if (availableFromDate) {
        const date = new Date(availableFromDate);

        if (!isNaN(date.getTime())) {
          whereConditions.push(
            Prisma.sql`EXISTS(
              SELECT 1 FROM "Lease" l
              WHERE l."propertyId" = p.id
              AND l."startDate" <= ${date.toISOString()}
            )`
          );
        }
      }
    }

    if (latitude && longitude) {
      const lat = parseFloat(latitude as string);
      const lng = parseFloat(longitude as string);
      const radiusInKilometers = 1000;
      const degrees = radiusInKilometers / 111;

      whereConditions.push(
        Prisma.sql`ST_DWithin(
          l.coordinates::geometry,
          ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326),
          ${degrees})`
      );
    }
    const totalRowsQuery = Prisma.sql`
      SELECT COUNT(*) OVER()::int AS total_rows FROM "Property" p
      JOIN "Location" l ON p."locationId" = l.id
      ${
        whereConditions.length > 0
          ? Prisma.sql`WHERE ${Prisma.join(whereConditions, " AND ")}`
          : Prisma.empty
      }
  `;

    const completeQuery = Prisma.sql`
    SELECT p.*, json_build_object(
      'id', l.id,
      'address', l.address,
      'city', l.city,
      'state', l.state,
      'country', l.country,
      'postalCode', l."postalCode",
      'coordinates', json_build_object(
        'longitude', ST_X(l."coordinates"::geometry),
        'latitude', ST_Y(l."coordinates"::geometry)
      )) as location
      FROM "Property" p
      JOIN "Location" l ON p."locationId" = l.id
      ${
        whereConditions.length > 0
          ? Prisma.sql`WHERE ${Prisma.join(whereConditions, " AND ")}`
          : Prisma.empty
      }
      limit 3 offset ${off}
    `;

    const totalRows: any = await prisma.$queryRaw(totalRowsQuery);
    const properties = await prisma.$queryRaw(completeQuery);

    const data = {
      properties,
      pagination: {
        totalRows: totalRows[0]?.total_rows ?? 0,
        page: pageNo,
        totalPage: Math.ceil(totalRows[0]?.total_rows ?? 0 / 3),
        limit: lim,
      },
    };
    res.status(200).json(data);
  } catch (error: any) {
    console.log(`Error retrieving properties: ${error.message}`);
    res.status(500).json({
      message: `Error retrieving properties: ${error.message}`,
    });
  }
};

export const getProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const property = await prisma.property.findUnique({
      where: { id: Number(id) },
      include: {
        location: true,
      },
    });

    if (property) {
      const coordinates: { coordinates: string }[] =
        await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates from "Location" where id = ${property.location.id}`;

      const geoJSON: any = wktToGeoJSON(coordinates[0]?.coordinates || "");
      const longitude = geoJSON.coordinates[0];
      const latitude = geoJSON.coordinates[1];

      const propertyWithCoordinates = {
        ...property,
        location: {
          ...property.location,
          coordinates: {
            longitude,
            latitude,
          },
        },
      };

      res.json(propertyWithCoordinates);
    } else {
      res.status(404).json({ message: "Property Not Found" });
    }
  } catch (error: any) {
    console.log(`Error retrieving property: ${error.message}`);
    res
      .status(500)
      .json({ message: `Error retrieving property: ${error.message}` });
  }
};

export const createProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];
    const {
      address,
      city,
      state,
      longitude,
      latitude,
      country,
      postalCode,
      managerCognitoId,
      ...propertyData
    } = req.body;

    const rawAmenities = JSON.parse(propertyData.amenities);
    const amenities: Amenity[] = Array.isArray(rawAmenities)
      ? rawAmenities.filter((a): a is Amenity =>
          Object.values(Amenity).includes(a)
        )
      : [];
    const rawHighlights = JSON.parse(propertyData.highlights);
    const highlights: Highlight[] = Array.isArray(rawHighlights)
      ? rawHighlights.filter((h): h is Highlight =>
          Object.values(Highlight).includes(h)
        )
      : [];

    const photoUrls = await Promise.all(
      files.map(async (file) => {
        const uploadParams = {
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: `properties/${Date.now()}-${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        const uploadResult = await new Upload({
          client: s3Client,
          params: uploadParams,
        }).done();
        return uploadResult.Location;
      })
    );

    const formattedLongitude = Number(longitude);
    const formattedLatitude = Number(latitude);

    // creating location
    const [location] = await prisma.$queryRaw<Location[]>`
  INSERT INTO "Location" (address, city, state, country, "postalCode", coordinates)
  VALUES (
    ${address},
    ${city},
    ${state},
    ${country},
    ${postalCode},
    ST_SetSRID(ST_MakePoint(${formattedLongitude ?? 0}, ${
      formattedLatitude ?? 0
    }), 4326)
  )
  RETURNING id, address, city, state, country, "postalCode", ST_AsText(coordinates) as coordinates;
`;

    // create property

    let expiresIn = new Date();
    const today = new Date();

    expiresIn.setMinutes(today.getMinutes() + 5);

    const adminEmail = process.env.ADMIN_EMAIL;

    const newProperty = await prisma.property.create({
      data: {
        ...propertyData,
        photoUrls,
        locationId: location.id,
        managerCognitoId,
        amenities,
        highlights,
        isPetsAllowed: propertyData.isPetsAllowed === "true",
        isParkingIncluded: propertyData.isParkingIncluded === "true",
        pricePerMonth: parseFloat(propertyData.pricePerMonth),
        securityDeposit: parseFloat(propertyData.pricePerMonth),
        applicationFee: parseFloat(propertyData.applicationFee),
        beds: parseInt(propertyData.beds),
        baths: parseFloat(propertyData.baths),
        squareFeet: parseInt(propertyData.squareFeet),
        expiresIn,
      },
      include: {
        location: true,
        manager: true,
      },
    });

    sendVerificationEmail(adminEmail!, newProperty);

    res.status(201).json({
      message: "Property is created wait for it's approval",
    });
  } catch (error: any) {
    console.log(`Error creating property: ${error.message}`);
    res.status(500).json({
      message: `Error creating property: ${error.message}`,
    });
  }
};
