import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { Bed, Heart, ShowerHead, Star } from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Property } from "@/types/prismaTypes";

const PropertyCard = ({
  property,
  isFavorite,
  addToFavorite,
  removeFromFavorite,
  showFavoriteButton,
  link,
}: {
  property: Property;
  isFavorite: boolean;
  addToFavorite: (id: number) => void;
  removeFromFavorite: (id: number) => void;
  showFavoriteButton: boolean;
  link?: string;
}) => {
  return (
    <Card className="py-0 my-10 min-w-80  min-h-64">
      <CardContent className="px-0">
        <div className="w-full  border-primary  relative h-48">
          <Image
            src={
              property.photoUrls && property.photoUrls.length
                ? property.photoUrls[0]
                : "/property-image-0.jpg"
            }
            alt={property.name}
            fill
            className="object-cover rounded-t-lg"
          />

          {showFavoriteButton && (
            <div className="p-1  absolute top-2 right-2 bg-white rounded-full">
              {isFavorite ? (
                <Heart
                  onClick={() => removeFromFavorite(property.id)}
                  fill="#fb2c36 "
                  className=" w-4 h-4 text-red-500"
                />
              ) : (
                <Heart
                  onClick={() => addToFavorite(property.id)}
                  fill="black"
                  className="w-4 h-4"
                />
              )}
            </div>
          )}

          <div className="flex px-4 absolute bottom-2 justify-between items-center w-full">
            <div className="  flex gap-2 items-center">
              {property.amenities.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="bg-white/50 py-1 px-2 rounded-full text-white font-semibold text-[10px]"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="px-5 py-2">
          <div className="my-1 space-y-1 ">
            <Link
              prefetch
              className="hover:cursor-pointer"
              href={link || `/property/${property.id}`}
            >
              <h2 className="font-bold text-lg">{property.name}</h2>
            </Link>
            <p>
              {property.location?.country} {property.location?.state}
            </p>
          </div>

          <div className="flex justify-between w-full">
            <div className="flex gap-2 items-center">
              <Star
                className="w-5 h-5 text-yellow-600"
                fill="oklch(68.1% 0.162 75.834)"
              />{" "}
              <span>{property.averageRating}</span>{" "}
              <span>({property.numberOfReviews} Reviews)</span>
            </div>
            <div>
              <span className="font-bold">${property.pricePerMonth}</span> month
            </div>
          </div>

          <Separator className="mt-4" />
        </div>
      </CardContent>
      <CardFooter className="flex mb-4 justify-between items-center">
        <div className="flex  gap-2">
          <Bed />
          {property.beds} Bed
        </div>
        <div className="flex gap-2">
          <ShowerHead />
          {property.baths} Baths
        </div>
        {property.amenities.includes("Pool") && (
          <div className="flex gap-2">
            <Image
              src="/swimming-pool.png"
              alt="swimming-pool"
              width={20}
              height={20}
            />
            Pool
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
