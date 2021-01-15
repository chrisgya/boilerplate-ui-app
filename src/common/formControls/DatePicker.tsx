import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-date-picker";
import cx from "classnames";

export const MyDatePicker: React.FC<{ label: string; name: string }> = ({ label, name, ...rest }) => {
  const { control, formState } = useFormContext();

  return (
    <div className="block my-3">
      <label className="block" htmlFor={name}>
        {label}
      </label>
      <Controller
        as={DatePicker}
        control={control}
        name={name}
        {...rest}
        className={cx(
          "w-full p-1.5 my-0.5 bg-white shadow-md",
          formState.touched[name] && formState.errors[name] && "border-red-600 border border-solid"
        )}
      />
      {!!formState.touched[name] && !!formState.errors[name] && (
        <p className="text-red-600">{formState.errors[name].message}</p>
      )}
    </div>
  );
};
