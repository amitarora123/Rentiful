"use client";
import PropertyCard from "@/components/PropertyCard";
import { useAppSelector } from "@/store/hooks";
import React from "react";

const Page = () => {
  const managerId = 1;

  const { properties } = useAppSelector((state) => state.property);

  const managedProperties = properties.filter((p) => p.managerId === managerId);

  return (
    <div className="flex-1 flex flex-wrap gap-3 px-2 my-5">
      {managedProperties.map((property, index) => (
        <PropertyCard {...property} key={index} />
      ))}
    </div>
  );
};

export default Page;
