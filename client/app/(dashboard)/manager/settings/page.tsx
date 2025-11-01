"use client";

import SettingsForm from "@/components/SettingsForm";
import {
  useGetAuthUserQuery,
  useUpdateManagerSettingsMutation,
} from "@/store/api";
import { SettingsFormData } from "@/types/zodSchema";

const Settings = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const [updateManagerSettings] = useUpdateManagerSettingsMutation();

  const onSubmit = async (data: SettingsFormData) => {
    try {
      updateManagerSettings({
        cognitoId: authUser!.userInfo.cognitoId,
        ...data,
      });
    } catch (error) {
      console.log("Error while updating settings", error);
    }
  };

  return (
    <div className="p-10 bg-primary-100 h-full w-full">
      <h1 className="font-bold text-xl">Tenant Settings</h1>
      <p className="text-primary-500 my-2">
        Manage your account preferences and personal information
      </p>
      <SettingsForm
        initialData={authUser!.userInfo}
        onSubmit={onSubmit}
        userType={authUser?.userRole}
      />
    </div>
  );
};

export default Settings;
