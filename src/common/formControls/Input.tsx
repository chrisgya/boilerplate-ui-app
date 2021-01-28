import React from "react";
import cx from "classnames";
import { useFormContext } from "react-hook-form";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label?: string;
  name: string;
  type: "text" | "email" | "number" | "password";
  dontShowError?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { formState } = useFormContext();

  return (
    <div className="block my-3">
      {props.label && <label className="block" htmlFor={props.name}>
        {props.label}
      </label>
      }
      <input
        className={cx(
          "border-0 w-full p-1.5 my-1 focus:outline-none focus:ring focus:border-blue-300 shadow-md",
          formState.touched[props.name] && formState.errors[props.name] && !props.dontShowError && "border-red-600 border border-solid"
        )}
        type={props.type}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        ref={ref}
        onBlur={props.onBlur}
      />

      {!!formState.touched[props.name] && !!formState.errors[props.name] && !props.dontShowError && (
        <p className="text-red-600">{formState.errors[props.name].message}</p>
      )}
    </div>
  );
});

export { Input };
