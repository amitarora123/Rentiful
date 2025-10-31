"use client";
import PropertyCard from "@/components/PropertyCard";
import { useAppSelector } from "@/store/hooks";
import { Loader } from "lucide-react";
import React from "react";

const FavoriteProperties = () => {
  const { favoritePropertyIds, properties } = useAppSelector(
    (state) => state.property
  );

  const favoriteProperties = favoritePropertyIds.map((id) =>
    properties.find((property) => property.id === id)
  );
  return (
    <div className="flex-1 ">
      <div className=" flex flex-wrap gap-10 p-8 ">
        {favoriteProperties.map((property, index) => (
          <PropertyCard {...property!} key={index} />
        ))}
      </div>

      <div className="text-center my-10">
        <p className="flex items-center justify-center gap-5">
          <Loader className="animate-spin size-5" /> Load more properties
        </p>
      </div>
    </div>
  );
};

export default FavoriteProperties;
