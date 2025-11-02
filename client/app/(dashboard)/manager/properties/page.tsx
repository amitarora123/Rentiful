"use client";

import PropertyCard from "@/components/PropertyCard";
import Loading from "@/components/Loading";
import { useGetAuthUserQuery, useGetManagerPropertiesQuery } from "@/store/api";
import DashboardHeader from "../../tenant/components/DashBoardHeader";

const Properties = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const {
    data: managerProperties,
    isLoading,
    error,
  } = useGetManagerPropertiesQuery(authUser?.cognitoInfo?.userId || "", {
    skip: !authUser?.cognitoInfo?.userId,
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading manager properties</div>;

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="My Properties"
        subtitle="View and manage your property listings"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
        {managerProperties?.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isFavorite={false}
            addToFavorite={() => {}}
            removeFromFavorite={() => {}}
            showFavoriteButton={false}
            link={`/manager/properties/${property.id}`}
          />
        ))}
      </div>
      {(!managerProperties || managerProperties.length === 0) && (
        <p>You don&lsquo;t manage any properties</p>
      )}
    </div>
  );
};

export default Properties;
