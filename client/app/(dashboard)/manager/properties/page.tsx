"use client";
import PropertyCard from "@/components/PropertyCard";
import { useGetAuthUserQuery } from "@/store/api";
import { useAppSelector } from "@/store/hooks";

const Page = () => {
  const { data: authUser } = useGetAuthUserQuery();

  const { properties } = useAppSelector((state) => state.property);

  const managedProperties = properties.filter(
    (p) => p.managerCognitoId === authUser?.userInfo.cognitoId
  );

  return (
    <div className="flex-1 flex flex-wrap gap-3 px-2 my-5">
      {managedProperties.map((property, index) => (
        <PropertyCard {...property} key={index} />
      ))}
    </div>
  );
};

export default Page;
