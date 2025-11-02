"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import { Download, Edit3Icon, Mail, MapPin, User2 } from "lucide-react";
import { formatAddress } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Button } from "@/components/ui/button";
import { FaCcVisa } from "react-icons/fa";
import { BillingHistoryTable } from "@/components/billing-table";
import { useGetPropertiesQuery } from "@/store/api";

const Billing = () => {
  const { application } = useAppSelector((state) => state.lease);
  const { filters } = useAppSelector((state) => state.filter);
  const { data: properties } = useGetPropertiesQuery(filters);
  const { activeMethod } = useAppSelector((state) => state.payment);

  const activeLease = application.find((app) => app.status === "ACTIVE");
  const activeProperty = properties?.find(
    (p) => p.id === activeLease?.propertyId
  );

  return (
    <div className="flex-1 w-full p-5 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {activeLease && activeProperty ? (
          <Card className="p-5 gap-2 justify-between">
            <CardContent className="p-0 ">
              <div className="flex h-full flex-col lg:flex-row gap-5">
                <div className="h-full ">
                  <Image
                    src={activeProperty.photoUrls[0] ?? "/property-image-0.jpg"}
                    width={150}
                    height={200}
                    alt={activeProperty.name}
                    className="h-full  max-h-50 object-center object-cover w-full  rounded-xl"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div className="h-full flex flex-col gap-0.5">
                    <p className="bg-emerald-500 text-white rounded-full px-3 py-1 text-xs w-fit">
                      Active Leases
                    </p>
                    <p className="font-bold my-1">{activeProperty.name}</p>
                    <div className="flex gap-1 text-xs items-center">
                      <MapPin className="size-3" />
                      {formatAddress(activeProperty.location!)}
                    </div>
                  </div>
                  <div className="max-lg:mt-5">
                    <span className="font-bold ">
                      ${activeProperty.pricePerMonth}{" "}
                    </span>{" "}
                    month
                  </div>
                </div>
              </div>
            </CardContent>
            <Separator />

            <div className=" grid grid-cols-3 text-xs">
              <div className="p-2 border-r text-center">
                <span>
                  Start Date:{" "}
                  <span className="font-bold">{activeLease.startDate} </span>
                </span>
              </div>

              <div className="p-2 border-r text-center">
                <span>
                  End Date:{" "}
                  <span className="font-bold">{activeLease.endDate}</span>
                </span>
              </div>

              <div className="p-2 text-center">
                <span>
                  Next Date:{" "}
                  <span className="font-bold">{activeLease.endDate} </span>{" "}
                </span>
              </div>
            </div>

            <Separator />

            <div className="flex lg:flex-row flex-col lg:items-center justify-end gap-3">
              <Button variant="outline">
                <User2 className="size-5 inline align-middle mr-1" /> Manager
              </Button>
              <Button variant="outline">
                <Download className="size-5 inline align-middle mr-1" />{" "}
                Download Agreement
              </Button>
            </div>
          </Card>
        ) : null}

        {activeMethod && (
          <Card>
            <CardContent>
              <div>
                <h3 className="font-bold text-lg">Payment Method</h3>
                <p className="text-sm text-primary-700 ">
                  Change how you pay for your plan
                </p>
              </div>

              <div className="p-5 rounded-xl border my-5 flex flex-col gap-3">
                <div className="flex gap-6 md:flex-row flex-col">
                  <FaCcVisa className="size-20" />
                  <div className="flex flex-col gap-1 justify-center">
                    <div className="font-semibold">
                      Visa ending in {activeMethod.expiryYear}{" "}
                      <span className="text-xs  px-2 md:px-3 ml-3 py-1 rounded-full border border-black">
                        Default
                      </span>{" "}
                    </div>
                    <p>
                      Expiry. {activeMethod.expiryMonth}/
                      {activeMethod.expiryYear}{" "}
                    </p>
                    <p>
                      <Mail className="size-5 inline mr-1 align-middle" />{" "}
                      billing@rentiful.com{" "}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-end">
                  <Button variant="outline">
                    <Edit3Icon className="size-5 inline mr-1 align-middle" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <BillingHistoryTable />
    </div>
  );
};

export default Billing;
