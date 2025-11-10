"use client";

import { CustomFormField } from "@/components/FormField";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PropertyFormData, propertySchema } from "@/lib/schema";
import { useCreatePropertyMutation, useGetAuthUserQuery } from "@/store/api";
import { AmenityEnum, HighlightEnum, PropertyTypeEnum } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/app/(dashboard)/tenant/components/DashBoardHeader";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Place } from "@/types/property";

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const NewProperty = () => {
  const [createProperty] = useCreatePropertyMutation();
  const { data: authUser } = useGetAuthUserQuery();
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [countries, setCountries] = useState<
    Array<{
      name: string;
      cca2: string;
    }>
  >([]);
  const [states, setStates] = useState<Array<string>>([]);
  const [cities, setCities] = useState<Array<string>>([]);
  const [addresses, setAddresses] = useState<Place[]>([]);

  const [isCountryLoading, setIsCountryLoading] = useState(false);
  const [isStateLoading, setIsStateLoading] = useState(false);
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [isAddressLoading, setIsAddressLoading] = useState(false);

  const [countryQuery, setCountryQuery] = useState("");
  const [stateQuery, setStateQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [addressQuery, setAddressQuery] = useState("");

  const isUserTyping = useRef(false);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: "",
      description: "",
      pricePerMonth: 1000,
      securityDeposit: 500,
      applicationFee: 100,
      isPetsAllowed: true,
      isParkingIncluded: true,
      photoUrls: [],
      amenities: [],
      highlights: [],
      beds: 1,
      baths: 1,
      squareFeet: 1000,
      address: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      propertyType: PropertyTypeEnum.Rooms,
    },
  });

  const fetchCountries = useCallback(async (val: string) => {
    try {
      setIsCountryLoading(true);

      const res = await fetch(`https://restcountries.com/v3.1/name/${val}`);
      const countriesList = await res.json();

      const formattedCountriesNames = countriesList.map((country: any) => ({
        name: country.name.common,
        cca2: country.cca2,
      }));
      setCountries(formattedCountriesNames);
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setIsCountryLoading(false);
    }
  }, []);

  const fetchStates = useCallback(async (countryCode: string, val: string) => {
    try {
      setIsStateLoading(true);
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${val}.json?country=${countryCode}&types=region&access_token=${MAPBOX_ACCESS_TOKEN}`;

      const res = await fetch(url);

      const statesList = await res.json();
      const formattedStatesList = statesList.features.map(
        (state: any) => state.text
      );

      setStates(formattedStatesList);
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setIsStateLoading(false);
    }
  }, []);

  const fetchCities = useCallback(
    async (countryCode: string, state: string, val: string) => {
      try {
        setIsCityLoading(true);
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${val}.json?country=${countryCode}&region=${state}&types=place&access_token=${MAPBOX_ACCESS_TOKEN}`;

        const res = await fetch(url);

        const citiesList = await res.json();

        const formattedCitiesList = citiesList.features.map(
          (city: any) => city.text
        );

        setCities(formattedCitiesList);
      } catch (error) {
        console.log("Something went wrong", error);
      } finally {
        setIsCityLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);

  const onSubmit = async (data: PropertyFormData) => {
    if (!authUser?.cognitoInfo?.userId) {
      throw new Error("No manager ID found");
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "photoUrls") {
        const files = value as File[];
        files.forEach((file: File) => {
          formData.append("photos", file);
        });
      } else if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    formData.append("managerCognitoId", authUser.cognitoInfo.userId);

    const res = await createProperty(formData);

    if (res) {
      form.reset();
    }
  };

  const fetchAddresses = useCallback(async (q: string) => {
    setIsAddressLoading(true);
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          q
        )}.json?access_token=${MAPBOX_ACCESS_TOKEN}&autocomplete=true&limit=5`
      );
      const data = await res.json();
      setAddresses(data.features || []);
    } finally {
      setIsAddressLoading(false);
    }
  }, []);

  useEffect(() => {
    document.onclick = () => {
      setCountries([]);
      setCities([]);
      setStates([]);
    };
  }, []);

  useEffect(() => {
    if (!isUserTyping.current) return;

    const handler = setTimeout(() => {
      if (countryQuery.trim().length > 2) fetchCountries(countryQuery);
      else setCountries([]);
    }, 500);

    return () => clearTimeout(handler);
  }, [countryQuery, fetchCountries]);

  useEffect(() => {
    if (
      !isUserTyping.current ||
      !selectedCountryCode ||
      !form.getValues("state") ||
      !cityQuery
    )
      return;

    const handler = setTimeout(() => {
      if (cityQuery.trim().length > 2)
        fetchCities(selectedCountryCode, form.getValues("state"), cityQuery);
      else setCities([]);
    }, 500);

    return () => clearTimeout(handler);
  }, [cityQuery, fetchCities, selectedCountryCode, form]);

  useEffect(() => {
    if (!isUserTyping.current || !selectedCountryCode) return;

    const handler = setTimeout(() => {
      if (stateQuery.trim().length > 2)
        fetchStates(selectedCountryCode, stateQuery);
      else setStates([]);
    }, 500);

    return () => clearTimeout(handler);
  }, [stateQuery, fetchStates, selectedCountryCode]);

  useEffect(() => {
    if (!isUserTyping.current) return;
    const handler = setTimeout(() => {
      if (addressQuery.trim().length > 2) fetchAddresses(addressQuery);
      else setAddresses([]);
    }, 500);
    return () => clearTimeout(handler);
  }, [addressQuery, fetchAddresses]);

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Add New Property"
        subtitle="Create a new property listing with detailed information"
      />
      <div className="bg-white rounded-xl lg:p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-4 space-y-10"
          >
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <CustomFormField name="name" label="Property Name" />
                <CustomFormField
                  name="description"
                  label="Description"
                  type="textarea"
                />
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Fees */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">Fees</h2>
              <CustomFormField
                name="pricePerMonth"
                label="Price per Month"
                type="number"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomFormField
                  name="securityDeposit"
                  label="Security Deposit"
                  type="number"
                />
                <CustomFormField
                  name="applicationFee"
                  label="Application Fee"
                  type="number"
                />
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Property Details */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CustomFormField
                  name="beds"
                  label="Number of Beds"
                  type="number"
                />
                <CustomFormField
                  name="baths"
                  label="Number of Baths"
                  type="number"
                />
                <CustomFormField
                  name="squareFeet"
                  label="Square Feet"
                  type="number"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <CustomFormField
                  name="isPetsAllowed"
                  label="Pets Allowed"
                  type="switch"
                />
                <CustomFormField
                  name="isParkingIncluded"
                  label="Parking Included"
                  type="switch"
                />
              </div>
              <div className="mt-4">
                <CustomFormField
                  name="propertyType"
                  label="Property Type"
                  type="select"
                  options={Object.keys(PropertyTypeEnum).map((type) => ({
                    value: type,
                    label: type,
                  }))}
                />
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Amenities and Highlights */}
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Amenities and Highlights
              </h2>
              <div className="space-y-6">
                <CustomFormField
                  name="amenities"
                  label="Amenities"
                  type="multi-input"
                  options={Object.keys(AmenityEnum).map((amenity) => ({
                    value: amenity,
                    label: amenity,
                  }))}
                />
                <CustomFormField
                  name="highlights"
                  label="Highlights"
                  type="multi-input"
                  options={Object.keys(HighlightEnum).map((highlight) => ({
                    value: highlight,
                    label: highlight,
                  }))}
                />
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Photos */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Photos</h2>
              <CustomFormField
                name="photoUrls"
                label="Property Photos"
                type="file"
                accept="image/*"
              />
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Additional Information */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">
                Additional Information
              </h2>
              {/* <CustomFormField name="country" label="Country" /> */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          {...field}
                          onChange={(e) => {
                            setCountryQuery(e.target.value);
                            isUserTyping.current = true;
                            field.onChange(e);
                          }}
                          className="w-full px-4 py-2 focus-visible:ring-0 focus-visible:outline-0  outline-none shadow-sm"
                        />

                        {isCountryLoading && (
                          <span className="absolute right-3 top-2 text-gray-400 text-sm">
                            ...
                          </span>
                        )}

                        <ul className="absolute bg-white shadow-lg w-full mt-1 rounded-lg z-20">
                          {countries.slice(0, 5).map((country, index) => (
                            <li
                              onClick={() => {
                                form.setValue("country", country.name);
                                isUserTyping.current = false;
                                setSelectedCountryCode(country.cca2);
                              }}
                              className={`w-full px-3 py-2 hover:bg-primary-100 ${
                                index === 0 ? "rounded-t-lg" : ""
                              } ${
                                index === countries.length || index === 5
                                  ? "rounded-b-lg"
                                  : ""
                              }`}
                              key={index}
                            >
                              {country.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            {...field}
                            disabled={!selectedCountryCode}
                            onChange={(e) => {
                              setStateQuery(e.target.value);
                              isUserTyping.current = true;
                              field.onChange(e);
                            }}
                            className="w-full px-4 py-2 focus-visible:ring-0 focus-visible:outline-0  outline-none shadow-sm"
                          />

                          {isStateLoading && (
                            <span className="absolute right-3 top-2 text-gray-400 text-sm">
                              ...
                            </span>
                          )}

                          <ul className="absolute bg-white shadow-lg w-full mt-1 rounded-lg z-20">
                            {states.slice(0, 5).map((state, index) => (
                              <li
                                onClick={() => {
                                  form.setValue("state", state);
                                  isUserTyping.current = false;
                                }}
                                className={`w-full px-3 py-2 hover:bg-primary-100 ${
                                  index === 0 ? "rounded-t-lg" : ""
                                } ${
                                  index === states.length || index === 5
                                    ? "rounded-b-lg"
                                    : ""
                                }`}
                                key={index}
                              >
                                {state}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            {...field}
                            disabled={!form.getValues("state")}
                            onChange={(e) => {
                              setCityQuery(e.target.value);
                              isUserTyping.current = true;
                              field.onChange(e);
                            }}
                            className="w-full px-4 py-2 focus-visible:ring-0 focus-visible:outline-0  outline-none shadow-sm"
                          />

                          {isCityLoading && (
                            <span className="absolute right-3 top-2 text-gray-400 text-sm">
                              ...
                            </span>
                          )}

                          <ul className="absolute bg-white shadow-lg w-full mt-1 rounded-lg z-20">
                            {cities.slice(0, 5).map((city, index) => (
                              <li
                                onClick={() => {
                                  form.setValue("city", city);
                                  isUserTyping.current = false;
                                }}
                                className={`w-full px-3 py-2 hover:bg-primary-100 ${
                                  index === 0 ? "rounded-t-lg" : ""
                                } ${
                                  index === cities.length || index === 5
                                    ? "rounded-b-lg"
                                    : ""
                                }`}
                                key={index}
                              >
                                {city}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <CustomFormField
                  name="postalCode"
                  label="Postal Code"
                  className="w-full"
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          {...field}
                          onChange={(e) => {
                            setAddressQuery(e.target.value);
                            isUserTyping.current = true;
                            field.onChange(e);
                          }}
                          className="w-full px-4 py-2 focus-visible:ring-0 focus-visible:outline-0 outline-none shadow-sm"
                        />

                        {isAddressLoading && (
                          <span className="absolute right-3 top-2 text-gray-400 text-sm">
                            ...
                          </span>
                        )}

                        <ul className="absolute bg-white shadow-lg w-full mt-1 rounded-lg z-20">
                          {addresses.slice(0, 5).map((address, index) => (
                            <li
                              onClick={() => {
                                form.setValue("address", address.place_name);
                                form.setValue("longitude", address.center[0]);
                                form.setValue("latitude", address.center[1]);
                                isUserTyping.current = false;
                                setAddresses([]);
                              }}
                              className={`w-full px-3 py-2 hover:bg-primary-100 ${
                                index === 0 ? "rounded-t-lg" : ""
                              } ${
                                index === addresses.length || index === 5
                                  ? "rounded-b-lg"
                                  : ""
                              }`}
                              key={index}
                            >
                              {address.place_name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
            </div>

            <Button
              type="submit"
              className="bg-primary-700 text-white w-full mt-8"
            >
              Create Property
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewProperty;
