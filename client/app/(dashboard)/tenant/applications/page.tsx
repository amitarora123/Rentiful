"use client";
import React, { useState } from "react";
import ApplicationCard from "@/components/ApplicationCard";
import { useAppSelector } from "@/store/hooks";

const Applications = () => {
  const { application } = useAppSelector((state) => state.lease);

  enum LeaseState {
    All,
    Active,
    Inactive,
  }

  const [activeSection, setActiveSection] = useState<LeaseState>(
    LeaseState.All
  );
  const filteredApplications = application.filter((app) => {
    if (activeSection === LeaseState.Active) {
      return app.status === "ACTIVE";
    } else if (activeSection === LeaseState.Inactive) {
      return app.status === "INACTIVE";
    } else return true;
  });

  return (
    <div className="flex-1 px-5 sm:px-10">
      <div className="w-full flex gap-5 border-b items-center h-10 my-10">
        <button
          onClick={() => setActiveSection(LeaseState.All)}
          className={`h-full flex cursor-pointer items-center relative `}
        >
          All Property
          <p
            className={`absolute bottom-0 w-full trnasition-transform duration-300  origin-bottom  bg-black  ${
              activeSection === LeaseState.All
                ? "scale-x-full h-0.5"
                : "scale-x-0 h-0.5"
            }`}
          />
        </button>
        <button
          onClick={() => setActiveSection(LeaseState.Active)}
          className={`h-full flex cursor-pointer group items-center relative `}
        >
          Active
          <p
            className={`absolute bottom-0 w-full trnasition-transform duration-300 left-0 origin-bottom   bg-black ${
              activeSection === LeaseState.Active
                ? "scale-x-full h-0.5"
                : "scale-x-0 h-0.5"
            }`}
          />
        </button>
        <button
          onClick={() => setActiveSection(LeaseState.Inactive)}
          className={`h-full flex cursor-pointer items-center relative`}
        >
          Inactive
          <p
            className={`absolute w-full bottom-0 trnasition-transform duration-300 left-0 origin-bottom  bg-black  ${
              activeSection === LeaseState.Inactive
                ? "scale-x-full h-0.5"
                : "scale-x-0 h-0.5"
            }`}
          />
        </button>
      </div>
      <div className="space-y-5 my-10 ">
        {filteredApplications.map((lease) => (
          <ApplicationCard key={lease.id} {...lease} />
        ))}
      </div>
    </div>
  );
};

export default Applications;

// same username
