import {
  useAddFavoritePropertyMutation,
  useGetAuthUserQuery,
  useGetPropertiesQuery,
  useGetTenantQuery,
  useRemoveFavoritePropertyMutation,
} from "@/store/api";
import { useAppSelector } from "@/store/hooks";
import { Property } from "@/types/prismaTypes";
import PropertyCard from "@/components/PropertyCard";
import CardCompact from "@/components/PropertyCompactCard";
const Listings = () => {
  const { data: authUser } = useGetAuthUserQuery();

  const { data: tenant } = useGetTenantQuery(
    authUser?.cognitoInfo?.userId || "",
    {
      skip: !authUser?.cognitoInfo?.userId,
    }
  );
  const [addFavorite] = useAddFavoritePropertyMutation();
  const [removeFavorite] = useRemoveFavoritePropertyMutation();

  const viewMode = useAppSelector((state) => state.filter.viewMode);
  const filters = useAppSelector((state) => state.filter.filters);
  
  const { data, isLoading, isError } = useGetPropertiesQuery(filters);

  const properties = data?.properties;

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

  const handleFavoriteToggle = async (propertyId: number) => {
    if (!authUser) return;

    const isFavorite = tenant?.favorites?.some(
      (fav: Property) => fav.id === propertyId
    );

    if (isFavorite) {
      await removeFromFavorite(propertyId);
    } else {
      await addToFavorite(propertyId);
    }
  };

  if (isLoading) return <>Loading...</>;
  if (isError || !properties) return <div>Failed to fetch properties</div>;

  return (
    <div className="w-full">
      <h3 className="text-sm px-4 font-bold">
        {properties.length}{" "}
        <span className="text-gray-700 font-normal">
          Places in {filters.location?.name ?? "Globally"}
        </span>
      </h3>
      <div className="flex flex-col ">
        <div className="p-4 w-full ">
          {properties?.map((property) =>
            viewMode === "grid" ? (
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
                showFavoriteButton={!!authUser}
              />
            ) : (
              <CardCompact
                key={property.id}
                property={property}
                isFavorite={
                  tenant?.favorites?.some(
                    (fav: Property) => fav.id === property.id
                  ) || false
                }
                onFavoriteToggle={() => handleFavoriteToggle(property.id)}
                showFavoriteButton={!!authUser}
                propertyLink={`/property/${property.id}`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Listings;
