import { useGetAuthUserQuery } from "@/store/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import CustomFormField from "./CustomFormField";
import { SettingsFormData, zodSettingsFormData } from "@/types/zodSchema";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";

const SettingsForm = ({
  initialData,
  onSubmit,
  userType,
}: SettingsFormProps) => {
  const form = useForm<SettingsFormData>({
    defaultValues: {
      ...initialData,
    },
    resolver: zodResolver(zodSettingsFormData),
    mode: "onChange",
  });
  const [editMode, setEditMode] = useState(false);

  return (
    <Card className="z-50">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (data) => {
              await onSubmit(data);
              setEditMode(false);
            })}
            className="flex flex-col gap-5"
          >
            <CustomFormField
              control={form.control}
              label="Email"
              name="email"
              placeholder="Enter your Email"
              type="email"
              disabled={!editMode}
            />
            <CustomFormField
              control={form.control}
              name="name"
              label="Name"
              type="text"
              placeholder="Enter Your Name"
              disabled={!editMode}
            />
            <CustomFormField
              control={form.control}
              name="phoneNumber"
              label="Phone"
              type="text"
              placeholder="Enter Your Phone No."
              disabled={!editMode}
            />
            {editMode && (
              <div className="flex gap-4 items-center">
                <Button
                  type="submit"
                  className="bg-secondary-500 hover:bg-secondary-400"
                >
                  Save
                </Button>
                <Button
                  onClick={() => {
                    form.reset();
                    setEditMode(false);
                  }}
                  type="reset"
                  variant="outline"
                >
                  reset
                </Button>
              </div>
            )}
            {!editMode && (
              <div>
                <Button
                  className="bg-secondary-500 hover:bg-secondary-400"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </Button>
              </div>
            )}{" "}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingsForm;
