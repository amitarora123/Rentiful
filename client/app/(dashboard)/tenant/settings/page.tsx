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

  const onSubmit = async (data: SettingsFormData) => {
    try {
      updateTenantSettings({
        cognitoId: authUser!.userInfo.cognitoId,
        ...data,
      });
    } catch (error) {
      console.log("Error while updating settings", error);
    }
  };

  return (
    <div className="p-10 bg-primary-100 h-full w-full">
      <div className="mb-5">
        <h1 className="font-bold text-xl">Tenant Settings</h1>
        <p className="text-primary-500 my-2">
          Manage your account preferences and personal information
        </p>
      </div>
      <SettingsForm
        initialData={authUser!.userInfo}
        onSubmit={onSubmit}
        userType={authUser?.userRole}
      />
    </div>
  );
};

export default Settings;
