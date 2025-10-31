import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

type CustomFormFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type: "text" | "number" | "select" | "textarea" | "email";
  options?: [string, string][];
  placeholder: string;
  disabled?: boolean;
};

const CustomFormField = <T extends FieldValues>({
  name,
  control,
  label,
  type,
  options,
  placeholder,
  disabled = false,
}: CustomFormFieldProps<T>) => {
  if (type === "select") {
    if (!options || !options.length) {
      throw new Error("for type select options are required");
    }
  }
  return (
    <div>
      <FormField
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel className="text-primary-600"> {label}</FormLabel>
            <FormControl>
              {type === "select" ? (
                <Select
                  disabled={disabled}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{label}</SelectLabel>
                      {options!.map((option, index) => (
                        <SelectItem value={option[0]} key={index}>
                          {option[1]}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : type === "textarea" ? (
                <Textarea
                  disabled={disabled}
                  placeholder={placeholder}
                  {...field}
                />
              ) : (
                <Input disabled={disabled} {...field} type={type} />
              )}
            </FormControl>
            <FormMessage>{fieldState?.error?.message}</FormMessage>
          </FormItem>
        )}
      />

      {}
    </div>
  );
};

export default CustomFormField;
