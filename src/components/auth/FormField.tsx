
import React from "react";
import { FormField as RHFFormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, FieldPath } from "react-hook-form";

interface FormFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  labelClassName?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: string;
  inputClassName?: string;
}

const FormField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  control,
  name,
  label,
  labelClassName = "",
  placeholder,
  icon,
  rightIcon,
  type = "text",
  inputClassName = "",
}: FormFieldProps<TFieldValues, TName>) => {
  return (
    <RHFFormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="space-y-1 w-full">
          <FormLabel className={`block text-sm font-medium ${labelClassName}`}>
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              {icon && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  {icon}
                </div>
              )}
              <Input
                type={type}
                className={`w-full pr-10 ${rightIcon ? "pl-10" : ""} ${inputClassName}`}
                placeholder={placeholder}
                {...field}
              />
              {rightIcon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  {rightIcon}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};

export default FormField;
