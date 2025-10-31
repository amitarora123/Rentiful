// "use client";

// import { useState, ChangeEvent } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { User, Pencil, Save, X } from "lucide-react";

// export default function UserProfile() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [user, setUser] = useState({
//     name: "Amit Arora",
//     email: "amit@example.com",
//     phone: "+91 98765 43210",
//     address: "Sunrise Residency, New Delhi",
//     image: null as string | null,
//   });

//   const [editData, setEditData] = useState(user);

//   const handleChange = (field: string, value: string) => {
//     setEditData({ ...editData, [field]: value });
//   };

//   const handleSave = () => {
//     setUser(editData);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setEditData(user);
//     setIsEditing(false);
//   };

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const reader = new FileReader();
//       reader.onload = (ev) => {
//         handleChange("image", ev.target?.result as string);
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <h1 className="text-xl font-semibold mb-8">Your Profile</h1>

//       <div className="flex flex-col gap-8">
//         {/* Profile Image */}
//         <div className="relative w-fit">
//           <Avatar className="  h-28 w-28 bg-gray-200 flex items-center justify-center rounded-full shadow-md overflow-hidden">
//             {editData.image ? (
//               <AvatarImage src={editData.image} alt={editData.name} />
//             ) : (
//               <AvatarFallback>
//                 <User className="h-16 w-16 text-gray-500" />
//               </AvatarFallback>
//             )}
//           </Avatar>

//           {isEditing && (
//             <label className="absolute bottom-0 right-0 cursor-pointer bg-white p-2 rounded-full shadow-md border border-gray-300">
//               <Pencil className="w-4 h-4 text-gray-700" />
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleImageChange}
//               />
//             </label>
//           )}
//         </div>

//         {/* Profile Info */}
//         <div className="flex-1 space-y-6">
//           {/* Name */}
//           <div>
//             <label className="text-sm text-gray-500 block mb-1">Name</label>
//             {isEditing ? (
//               <Input
//                 value={editData.name}
//                 onChange={(e) => handleChange("name", e.target.value)}
//               />
//             ) : (
//               <p className="font-medium text-gray-700">{user.name}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="text-sm text-gray-500 block mb-1">Email</label>
//             {isEditing ? (
//               <Input
//                 value={editData.email}
//                 onChange={(e) => handleChange("email", e.target.value)}
//               />
//             ) : (
//               <p className="font-medium text-gray-700">{user.email}</p>
//             )}
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="text-sm text-gray-500 block mb-1">Phone</label>
//             {isEditing ? (
//               <Input
//                 value={editData.phone}
//                 onChange={(e) => handleChange("phone", e.target.value)}
//               />
//             ) : (
//               <p className="font-medium text-gray-700">{user.phone}</p>
//             )}
//           </div>

//           {/* Address */}
//           <div>
//             <label className="text-sm text-gray-500 block mb-1">Address</label>
//             {isEditing ? (
//               <Input
//                 value={editData.address}
//                 onChange={(e) => handleChange("address", e.target.value)}
//               />
//             ) : (
//               <p className="font-medium text-gray-700">{user.address}</p>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-2">
//             {isEditing ? (
//               <>
//                 <Button variant="outline" onClick={handleCancel}>
//                   <X className="w-4 h-4 mr-1" /> Cancel
//                 </Button>
//                 <Button onClick={handleSave}>
//                   <Save className="w-4 h-4 mr-1" /> Save
//                 </Button>
//               </>
//             ) : (
//               <Button onClick={() => setIsEditing(true)}>
//                 <Pencil className="w-4 h-4 mr-1" /> Edit Profile
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import SettingsForm from "@/components/SettingsForm";
import {
  useGetAuthUserQuery,
  useUpdateManagerSettingsMutation,
  useUpdateTenantSettingsMutation,
} from "@/store/api";
import { SettingsFormData } from "@/types/zodSchema";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const Settings = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const [updateTenantSettings] = useUpdateTenantSettingsMutation();
  const [updateMangerSettings] = useUpdateManagerSettingsMutation();

  const onSubmit = async (data: SettingsFormData) => {
    console.log("in on submit");
    if (authUser?.userRole === "tenant") {
      updateTenantSettings({ cognitoId: authUser.userInfo.cognitoId, ...data });
    } else {
      updateMangerSettings({
        cognitoId: authUser?.userInfo.cognitoId,
        ...data,
      });
    }
  };

  return (
    <div className="p-10 bg-primary-100 h-full w-full">
      <SettingsForm
        initialData={authUser?.userInfo}
        onSubmit={onSubmit}
        userType={authUser?.userRole}
      />
    </div>
  );
};

export default Settings;
