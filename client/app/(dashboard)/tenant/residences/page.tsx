"use client";

import PropertyCard from "@/components/PropertyCard";
import Loading from "@/components/Loading";
import {
  useAddFavoritePropertyMutation,
  useGetAuthUserQuery,
  useGetCurrentResidencesQuery,
  useGetTenantQuery,
  useRemoveFavoritePropertyMutation,
} from "@/store/api";
import { Property } from "@/types/prismaTypes";
import DashboardHeader from "../components/DashBoardHeader";

const Residences = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const { data: tenant } = useGetTenantQuery(
    authUser?.cognitoInfo?.userId || "",
    {
      skip: !authUser?.cognitoInfo?.userId,
    }
  );

  const {
    data: currentResidences,
    isLoading,
    error,
  } = useGetCurrentResidencesQuery(authUser?.cognitoInfo?.userId || "", {
    skip: !authUser?.cognitoInfo?.userId,
  });
  const [addFavorite] = useAddFavoritePropertyMutation();
  const [removeFavorite] = useRemoveFavoritePropertyMutation();

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading current residences</div>;

  const removeFromFavorite = async (propertyId: number) => {
    await removeFavorite({
      cognitoId: authUser!.userInfo.cognitoId,
      propertyId,
    });
  };
  const addToFavorite = async (propertyId: number) => {
    await addFavorite({
      cognitoId: authUser!.userInfo.cognitoId,
      propertyId,
    });
  };
  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Current Residences"
        subtitle="View and manage your current living spaces"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentResidences?.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isFavorite={
              tenant?.favorites?.some(
                (fav: Property) => fav.id === property.id
              ) || false
            }
            addToFavorite={addToFavorite}
            removeFromFavorite={removeFromFavorite}
            showFavoriteButton={false}
          />
        ))}
      </div>
      {(!currentResidences || currentResidences.length === 0) && (
        <p>You don&lsquo;t have any current residences</p>
      )}
    </div>
  );
};

export default Residences;
