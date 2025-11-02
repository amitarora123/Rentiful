// "use client";
// import React, { useState } from "react";
// import ApplicationCard from "@/components/ApplicationCard";
// import { useAppSelector } from "@/store/hooks";

// const Applications = () => {
//   const { application } = useAppSelector((state) => state.lease);

//   enum LeaseState {
//     All,
//     Active,
//     Inactive,
//   }

//   const [activeSection, setActiveSection] = useState<LeaseState>(
//     LeaseState.All
//   );
//   const filteredApplications = application.filter((app) => {
//     if (activeSection === LeaseState.Active) {
//       return app.status === "ACTIVE";
//     } else if (activeSection === LeaseState.Inactive) {
//       return app.status === "INACTIVE";
//     } else return true;
//   });

//   return (
//     <div className="flex-1 px-5 sm:px-10">
//       <div className="w-full flex gap-5 border-b items-center h-10 my-10">
//         <button
//           onClick={() => setActiveSection(LeaseState.All)}
//           className={`h-full flex cursor-pointer items-center relative `}
//         >
//           All Property
//           <p
//             className={`absolute bottom-0 w-full trnasition-transform duration-300  origin-bottom  bg-black  ${
//               activeSection === LeaseState.All
//                 ? "scale-x-full h-0.5"
//                 : "scale-x-0 h-0.5"
//             }`}
//           />
//         </button>
//         <button
//           onClick={() => setActiveSection(LeaseState.Active)}
//           className={`h-full flex cursor-pointer group items-center relative `}
//         >
//           Active
//           <p
//             className={`absolute bottom-0 w-full trnasition-transform duration-300 left-0 origin-bottom   bg-black ${
//               activeSection === LeaseState.Active
//                 ? "scale-x-full h-0.5"
//                 : "scale-x-0 h-0.5"
//             }`}
//           />
//         </button>
//         <button
//           onClick={() => setActiveSection(LeaseState.Inactive)}
//           className={`h-full flex cursor-pointer items-center relative`}
//         >
//           Inactive
//           <p
//             className={`absolute w-full bottom-0 trnasition-transform duration-300 left-0 origin-bottom  bg-black  ${
//               activeSection === LeaseState.Inactive
//                 ? "scale-x-full h-0.5"
//                 : "scale-x-0 h-0.5"
//             }`}
//           />
//         </button>
//       </div>
//       <div className="space-y-5 my-10 ">
//         {filteredApplications.map((lease) => (
//           <ApplicationCard key={lease.id} {...lease} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Applications;

// // same username

"use client";

import ApplicationCard from "@/components/ApplicationCard-2";
import Loading from "@/components/Loading";
import { useGetApplicationsQuery, useGetAuthUserQuery } from "@/store/api";
import { CircleCheckBig, Clock, Download, XCircle } from "lucide-react";
import DashboardHeader from "../components/DashBoardHeader";

const Applications = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const {
    data: applications,
    isLoading,
    isError,
  } = useGetApplicationsQuery({
    userId: authUser?.cognitoInfo?.userId,
    userType: "tenant",
  });

  if (isLoading) return <Loading />;
  if (isError || !applications) return <div>Error fetching applications</div>;

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Applications"
        subtitle="Track and manage your property rental applications"
      />
      <div className="w-full">
        {applications?.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            userType="renter"
          >
            <div className="flex justify-between gap-5 w-full pb-4 px-4">
              {application.status === "Approved" ? (
                <div className="bg-green-100 p-4 text-green-700 grow flex items-center">
                  <CircleCheckBig className="w-5 h-5 mr-2" />
                  The property is being rented by you until{" "}
                  {new Date(application.lease?.endDate).toLocaleDateString()}
                </div>
              ) : application.status === "Pending" ? (
                <div className="bg-yellow-100 p-4 text-yellow-700 grow flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Your application is pending approval
                </div>
              ) : (
                <div className="bg-red-100 p-4 text-red-700 grow flex items-center">
                  <XCircle className="w-5 h-5 mr-2" />
                  Your application has been denied
                </div>
              )}

              <button
                className={`bg-white border border-gray-300 text-gray-700 py-2 px-4
                          rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50`}
              >
                <Download className="w-5 h-5 mr-2" />
                Download Agreement
              </button>
            </div>
          </ApplicationCard>
        ))}
      </div>
    </div>
  );
};


export default Applications;
