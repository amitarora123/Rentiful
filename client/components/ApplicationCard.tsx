// import { Card, CardContent, CardFooter } from "./ui/card";
// import Image from "next/image";
// import { formatAddress } from "@/lib/utils";
// import { Download, Mail, MapPin, Phone, User } from "lucide-react";
// import { Separator } from "./ui/separator";
// import { Button } from "@/components/ui/button";
// import { HiDocument } from "react-icons/hi";
// import { BsTelephone } from "react-icons/bs";
// import { useGetPropertyQuery } from "@/store/api";
// import { Lease } from "@/types/prismaTypes";

// const ApplicationCard = ({ startDate, endDate, propertyId }: Lease) => {
//   const { data: property } = useGetPropertyQuery(propertyId);

//   if (!property) return null;

//   const manager = property?.manager;

//   const start = new Date(startDate);
//   const end = new Date(endDate);

//   const today = new Date()
//   const status = start <= today && end >= today ? "ACTIVE" : ""; 

//   const ms = end.getTime() - start.getTime();
//   const days = Math.floor(ms / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const duration =
//     days > 0
//       ? `${days} day${days > 1 ? "s" : ""}`
//       : `${hours} hour${hours > 1 ? "s" : ""}`;

//   return (
//     <Card className=" px-4 sm:px-6 lg:px-10">
//       <CardContent className="flex md:flex-row flex-col md:gap-0 gap-5 p-0 items-stretch">
//         <div className="flex gap-6 md:items-center min-w-3xs sm:min-w-xs flex-col sm:flex-row md:min-w-lg md:border-r sm:pr-10">
//           <Image
//             src={property.imageUrls[0]}
//             width={150}
//             height={200}
//             alt={property.name}
//             className="h-full w-full sm:max-w-40 rounded-xl"
//           />
//           <div className="flex-1 flex  flex-col h-full justify-between gap-4">
//             <div>
//               <h2 className="text-lg font-bold">{property.name} </h2>
//               <p className="flex mt-1 gap-2">
//                 <MapPin className="size-5" />
//                 <span>{property.location.address}</span>
//               </p>
//             </div>
//             <div className="justify-between flex flex-row ">
//               <p>
//                 <span className="font-bold  sm:text-lg">
//                   ${property.pricePerMonth}{" "}
//                 </span>{" "}
//                 month
//               </p>

//               <p className="">
//                 Duration - <span className="font-bold">{duration}</span>{" "}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col md:gap-0 gap-2 min-w-3xs  sm:min-w-2xs sm:px-5 sm:border-r sm:pr-5 justify-between">
//           <div className="flex justify-between">
//             <p>Status</p>
//             <p
//               className={`${
//                 status === LeaseStatus.ACTIVE
//                   ? "bg-green-400"
//                   : status === LeaseStatus.INACTIVE
//                   ? "bg-red-400"
//                   : "bg-orange-400"
//               } px-3 py-1 rounded-full text-white`}
//             >
//               {status}
//             </p>
//           </div>
//           <Separator />

//           <div className="flex justify-between">
//             <p>Start Date</p>
//             <p>{startDate}</p>
//           </div>

//           <div className="flex justify-between">
//             <p>End Date</p>
//             <p>{endDate}</p>
//           </div>

//           {status === "ACTIVE" && (
//             <div className="flex justify-between">
//               <p>Next Date</p>
//               <p>{endDate}</p>
//             </div>
//           )}
//         </div>

//         <div className="hidden flex-1 px-5 mt-2 flex-col md:flex gap-3">
//           <h3>Manager</h3>
//           <Separator />
//           <div className="flex gap-5">
//             <div>
//               {manager.imageUrl ? (
//                 <Image
//                   src={manager.imageUrl}
//                   width={50}
//                   height={70}
//                   alt={manager.imageUrl}
//                   className="size-15 object-center object-cover  rounded-full"
//                 />
//               ) : (
//                 <User className="size-10 rounded-full border p-1" />
//               )}
//             </div>
//             <div className="flex flex-col gap-3">
//               <p className="font-bold">{manager.name}</p>
//               <p className="flex gap-2">
//                 <Phone /> {manager.phoneNo}
//               </p>
//               <p className="flex gap-2">
//                 <Mail /> {manager.email}
//               </p>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//       <Separator className="max-md:hidden" />
//       <CardFooter className="px-0 hidden md:flex md:flex-row flex-col gap-5  md:gap-2">
//         <div
//           className={`flex-1 max-md:text-center  px-3  py-2 rounded-lg ${
//             status === "ACTIVE"
//               ? "bg-emerald-100 text-emerald-500"
//               : status === "PENDING"
//               ? "bg-orange-100 text-orange-500"
//               : "bg-red-100 text-red-500"
//           }`}
//         >
//           {status === "ACTIVE"
//             ? `The property is begin rented by you until ${endDate}`
//             : status === "PENDING"
//             ? `Rental Status Awaiting for manager's approval`
//             : `Property lease period has expired`}
//         </div>
//         <div className="hidden md:flex gap-2 sm:flex-row flex-col ">
//           <Button variant="outline" className="py-2">
//             <HiDocument />
//             Detail Property
//           </Button>
//           {status === "ACTIVE" ? (
//             <Button variant="outline">
//               <Download />
//               Download Agreement
//             </Button>
//           ) : (
//             <Button>
//               <BsTelephone />
//               Contact Manager
//             </Button>
//           )}
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// export default ApplicationCard;
