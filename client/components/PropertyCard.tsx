import { Property } from "@/types/property";
import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { Bed, Heart, ShowerHead, Star } from "lucide-react";
import { Separator } from "./ui/separator";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addToFavorite,
  removeFromFavorite,
} from "@/store/feature/propertySlice";
import Link from "next/link";

interface PropertyCardProps extends Property {
  className?: string;
}
const PropertyCard = ({
  id,
  address,
  baths,
  name,
  beds,
  features,
  poolAvailable,
  ratings,
  reviews,
  pricePerNight,
  imageUrls,
  className,
}: PropertyCardProps) => {
  const { favoritePropertyIds } = useAppSelector((state) => state.property);
  const dispatch = useAppDispatch();

  return (
    <Card className={`py-0 min-w-80  min-h-64 ${className}`}>
      <CardContent className="px-0">
        <div className="w-full  border-primary  relative h-48">
          <Image
            src={imageUrls[1]}
            alt={name}
            fill
            className="object-cover rounded-t-lg"
          />

          <div className="p-1  absolute top-2 right-2 bg-white rounded-full">
            {favoritePropertyIds.includes(id) ? (
              <Heart
                onClick={() => dispatch(removeFromFavorite(id))}
                fill="#fb2c36 "
                className=" w-4 h-4 text-red-500"
              />
            ) : (
              <Heart
                onClick={() => dispatch(addToFavorite(id))}
                fill="black"
                className="w-4 h-4"
              />
            )}
          </div>

          <div className="flex px-4 absolute bottom-2 justify-between items-center w-full">
            <div className="  flex gap-2 items-center">
              {features.slice(0, 3).map((feature, index) => (
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
              href={`/property/${id}`}
            >
              <h2 className="font-bold text-lg">{name}</h2>
            </Link>
            <p>
              {address.country} {address.state}
            </p>
          </div>

          <div className="flex justify-between w-full">
            <div className="flex gap-2 items-center">
              <Star
                className="w-5 h-5 text-yellow-600"
                fill="oklch(68.1% 0.162 75.834)"
              />{" "}
              <span>{ratings}</span> <span>({reviews} Reviews)</span>
            </div>
            <div>
              <span className="font-bold">${pricePerNight}</span> night
            </div>
          </div>

          <Separator className="mt-4" />
        </div>
      </CardContent>
      <CardFooter className="flex mb-4 justify-between items-center">
        <div className="flex  gap-2">
          <Bed />
          {beds} Bed
        </div>
        <div className="flex gap-2">
          <ShowerHead />
          {baths} Baths
        </div>
        {poolAvailable && (
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
