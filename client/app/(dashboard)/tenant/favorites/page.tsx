"use client";
import PropertyCard from "@/components/PropertyCard";
import {
  useAddFavoritePropertyMutation,
  useGetAuthUserQuery,
  useGetPropertyQuery,
  useGetTenantQuery,
  useRemoveFavoritePropertyMutation,
} from "@/store/api";
import { Loader } from "lucide-react";
import { useState } from "react";

const FavoriteProperties = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const [loadMoreProperties, setLoadMoreProperties] = useState(false);

  const { data: tenant } = useGetTenantQuery(
    authUser?.userInfo.cognitoId || ""
  );
  const [addFavorite] = useAddFavoritePropertyMutation();
  const [removeFavorite] = useRemoveFavoritePropertyMutation();

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

  const favoriteProperties = tenant?.favorites;
  return (
    <div className="flex-1 ">
      <div className=" flex flex-wrap gap-10 p-8 ">
        {favoriteProperties?.map((property, index) => (
          <PropertyCard
            showFavoriteButton={!!authUser}
            isFavorite={true}
            addToFavorite={addToFavorite}
            removeFromFavorite={removeFromFavorite}
            property={property}
            key={index}
          />
        ))}
      </div>

      {loadMoreProperties && (
        <div className="text-center my-10">
          <p className="flex items-center justify-center gap-5">
            <Loader className="animate-spin size-5" /> Load more properties
          </p>
        </div>
      )}
    </div>
  );
};

export default FavoriteProperties;
