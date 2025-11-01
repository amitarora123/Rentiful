/* eslint-disable @typescript-eslint/no-explicit-any */
import { Manager, Tenant, Property } from "@/types/prismaTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { getProperties } from "aws-amplify/storage";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const session = await fetchAuthSession();
      const { idToken } = session.tokens ?? {};

      if (idToken) {
        headers.set("Authorization", `Bearer ${idToken}`);
      }

      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: ["Tenant", "Manager"],
  endpoints: (build) => ({
    getAuthUser: build.query<User, void>({
      queryFn: async (_, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const session = await fetchAuthSession();
          const { idToken } = session.tokens ?? {};
          const user = await getCurrentUser();
          const userRole = idToken?.payload["custom:role"] as string;

          const endPoint =
            userRole === "manager"
              ? `/manager/${user.userId}`
              : `/tenant/${user.userId}`;

          let userDetailsResponse = await fetchWithBQ(endPoint);

          // if user doesn't exists, create new user

          if (
            userDetailsResponse.error &&
            userDetailsResponse.error.status === 404
          ) {
            userDetailsResponse = await fetchWithBQ({
              url: `/${userRole}/`,
              method: "POST",
              body: {
                cognitoId: user.userId,
                name: user.username,
                email: idToken?.payload?.email || "",
                phoneNumber: "",
              },
            });

            if (userDetailsResponse.error) {
              return {
                error:
                  userDetailsResponse.error ||
                  "Failed to create new user record",
              };
            }
          }

          return {
            data: {
              cognitoInfo: { ...user },
              userInfo: userDetailsResponse.data as Tenant | Manager,
              userRole,
            },
          };
        } catch (error: any) {
          return { error: error.message || "Could not fetch user data" };
        }
      },
    }),

    // getProperties: build.query<Array<Property>, void>({
    //   queryFn: async (_, _queryApi, _extraOptions, fetchWithBQ) => {
    //     const data = await fetchWithBQ("/properties");

    //     return data.data as Array<Property>;
    //   },
    // }),
    updateTenantSettings: build.mutation<
      Tenant,
      { cognitoId: string } & Partial<Tenant>
    >({
      query: ({ cognitoId, ...updatedTenant }) => ({
        url: `tenant/${cognitoId}`,
        method: "PUT",
        body: updatedTenant,
      }),
      invalidatesTags: (result) => [
        {
          type: "Tenant",
          id: result?.id,
        },
      ],
    }),
    updateManagerSettings: build.mutation<
      Manager,
      { cognitoId: string } & Partial<Tenant>
    >({
      query: ({ cognitoId, ...updatedManager }) => ({
        url: `manager/${cognitoId}`,
        method: "PUT",
        body: updatedManager,
      }),
      invalidatesTags: (result) => [
        {
          type: "Manager",
          id: result?.id,
        },
      ],
    }),

    getProperties: build.query<Property[], void>({
      queryFn: async (_, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const response = await fetchWithBQ("/properties");
          if (response.error) {
            return { error: response.error };
          }
          return { data: response.data as Property[] };
        } catch (error: any) {
          return {
            error:
              error.message || "Something went wrong while fetching properties",
          };
        }
      },
    }),
  }),
});

export const {
  useGetAuthUserQuery,
  useUpdateTenantSettingsMutation,
  useUpdateManagerSettingsMutation,
  useGetPropertiesQuery,
} = api;
