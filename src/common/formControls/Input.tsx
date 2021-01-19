import React, { FC } from "react";
import cx from "classnames";
import { useFormContext } from "react-hook-form";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label?: string;
  name: string;
  type: "text" | "email" | "number" | "password";
  dontShowError?: boolean;
};

const Input: FC<InputProps> = ({ name, type, label, placeholder, dontShowError, ...rest }) => {
  const { register, formState } = useFormContext();

  return (
    <div className="block my-3">
      {label && <label className="block" htmlFor={name}>
        {label}
      </label>
      }
      <input
        className={cx(
          "border-0 w-full p-1.5 my-1 focus:outline-none focus:ring focus:border-blue-300 shadow-md",
          formState.touched[name] && formState.errors[name] && !dontShowError && "border-red-600 border border-solid"
        )}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        ref={register}
        {...rest}
      />

      {!!formState.touched[name] && !!formState.errors[name] && !dontShowError && (
        <p className="text-red-600">{formState.errors[name].message}</p>
      )}
    </div>
  );
};

export { Input };
