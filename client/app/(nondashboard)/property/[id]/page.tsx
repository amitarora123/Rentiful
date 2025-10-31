"use client";

import { demoProperties } from "@/lib/constants";
import { useParams } from "next/navigation";
import Image from "next/image";
import { MapPin, Star, Verified } from "lucide-react";
import {
  WashingMachine,
  Snowflake,
  Utensils,
  Zap,
  Trees,
  Shirt,
  Microwave,
  Refrigerator,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import MapSection from "../../components/MapSection";
import PropertyContactCard from "../../components/PropertyContactCard";
import { useAppSelector } from "@/store/hooks";

export const propertyFeatures = [
  {
    name: "Washer/Dryer",
    icon: WashingMachine,
  },
  {
    name: "Air Conditioning",
    icon: Snowflake,
  },
  {
    name: "Dishwasher",
    icon: Utensils,
  },
  {
    name: "High Speed Internet",
    icon: Zap,
  },
  {
    name: "Hardwood Floors",
    icon: Trees,
  },
  {
    name: "Walk-In Closets",
    icon: Shirt,
  },
  {
    name: "Microwave",
    icon: Microwave,
  },
  {
    name: "Refrigerator",
    icon: Refrigerator,
  },
];

const Property = () => {
  const { properties } = useAppSelector((state) => state.property);
  const params = useParams();
  const id = Number(params.id);
  const property = properties.find((p) => p.id === id);

  if (!property) return null;

  return (
    <div className="w-full min-h-screen">
      <div className="grid grid-cols-4 overflow-hidden grid-rows-2 gap-2 h-[80vh]">
        {/* Left Large Image */}
        <div className="col-span-2 row-span-2 relative">
          <Image
            src={property.imageUrls[0]}
            alt={property.name}
            fill
            className="object-cover "
          />
        </div>

        {/* Right Side - 4 Small Images (2x2 grid) */}
        {property.imageUrls.slice(1, 5).map((url, i) => (
          <div key={i} className="relative col-span-1 row-span-1">
            <Image
              src={url}
              alt={`${property.name}-${i}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="my-10 px-20">
        <div className="grid grid-cols-4">
          <div className="col-span-3">
            <h2 className="flex items-center my-5 gap-2">
              <span>{property.address.country}</span>
              <span>/</span>
              <span>{property.address.state}</span>
              <span>/</span>
              <span className="font-bold">{property.address.city}</span>
            </h2>
            <h1 className="font-bold text-2xl">{property.name}</h1>
            <div className="w-full flex justify-between items-center my-5">
              <div className="flex gap-2">
                <MapPin />
                <p>
                  {" "}
                  {property.address.city}, {property.address.state},{" "}
                  <strong>{property.address.country}</strong>
                </p>
              </div>
              <div className="flex items-center gap-5">
                <p className="flex items-center gap-2">
                  <Star fill="#f0b100" className="text-yellow-500" size={20} />
                  <span>{property.ratings}</span>
                  <span>({property.reviews} Reviews)</span>
                </p>
                <span className="font-bold flex items-center gap-2">
                  <Verified />
                  Verified Listings
                </span>
              </div>
            </div>

            <div className="my-10 px-8 py-5 rounded-2xl border border-black  w-full gap-10 grid grid-cols-4">
              <div className="flex flex-col gap-1 py-3 border-r border-black ">
                <span className="text-xl font-semibold ">Monthly Rent</span>
                <span className="text-xl font-bold">
                  ${property.pricePerNight}
                </span>
              </div>
              <div className="flex flex-col py-3 gap-1 border-r border-black">
                <span className="text-xl font-semibold ">Bedrooms</span>
                <span className="text-xl font-bold">{property.beds} bd</span>
              </div>
              <div className="flex py-3 flex-col gap-1 border-r border-black">
                <span className="text-xl font-semibold ">Bathrooms</span>
                <span className="text-xl font-bold">{property.baths} ba</span>
              </div>
              <div className="flex py-3 flex-col gap-1 ">
                <span className="text-xl font-semibold ">Square Feet</span>
                <span className="text-xl font-bold">980 - 1,120 sq ft</span>
              </div>
            </div>

            <div className="my-10">
              <h2 className="text-lg font-semibold">About {property.name}</h2>
              <p className="my-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti repellendus modi mollitia nihil necessitatibus nulla,
                quidem ipsum animi exercitationem maiores debitis. Animi
                similique magni ut expedita. Omnis enim eius in beatae
                cupiditate dicta possimus ipsam culpa minus tempore natus totam
                exercitationem earum tempora non dolorem voluptatibus nostrum
                rerum suscipit reprehenderit atque, mollitia ut molestiae? Sit
                minima soluta quisquam quasi asperiores molestias fuga aut,
                porro neque quia illum ratione corporis, recusandae maiores,
                fugit quis rerum placeat voluptate dolorem. Ipsa saepe assumenda
                dolores nesciunt placeat cum veniam distinctio dolorem facere,
                corrupti nihil voluptates nostrum id ducimus perspiciatis, eius
                reiciendis provident sit culpa. Illo quae nesciunt ullam
                laudantium quas maxime, itaque cumque quod reprehenderit ducimus
                accusamus aliquid qui deserunt unde consequatur facere?
                Expedita, velit unde perspiciatis incidunt recusandae reiciendis
                vero veritatis. Minus fugit ipsa inventore officiis obcaecati
                error voluptates dolorum ab architecto natus excepturi debitis
                quidem assumenda aliquam voluptatum nobis sapiente, aut
                perferendis, iure suscipit! Eos nihil suscipit porro nesciunt
                nam facilis voluptate perspiciatis velit, enim labore illo
                consectetur ea explicabo? Fugit doloribus ullam esse dignissimos
                temporibus, laboriosam facere qui rerum. Sunt, temporibus.
              </p>
            </div>

            <h2 className="my-5 font-semibold text-lg">Villa Features</h2>
            <div className="grid grid-cols-4 gap-5 ">
              {propertyFeatures.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="flex  flex-col items-center justify-center gap-2">
                    <feature.icon size={30} />
                    {feature.name}
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="my-5 font-semibold text-lg">Highlights</h2>
            <ul className="grid grid-cols-3  pl-5 gap-y-1">
              {property.features.map((feature, index) => (
                <li className="list-disc text-primary-800 text-sm" key={index}>
                  {feature}
                </li>
              ))}
            </ul>
            <h2 className="mb-2 mt-15 font-semibold text-lg">
              Fees and Policies
            </h2>
            <p className="text-">
              The fees below are based on community-supplied data and may
              exclude additional fees and utilites
            </p>

            <MapSection {...property.address} />
          </div>
          <div className="w-full h-full">
            <div className="ml-10 w-full mt-5">
              <PropertyContactCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
