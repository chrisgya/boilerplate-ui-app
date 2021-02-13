import React, { useState } from "react";
import cx from "classnames";
import { useFormContext } from "react-hook-form";
import Icon from "../shared/svg/Icon";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label?: string;
  name: string;
  type: "text" | "email" | "number" | "password";
  topClass?: string;
  dontShowError?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { formState } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative block my-3">
      {props.label && <label className="block" htmlFor={props.name}>
        {props.label}
      </label>
      }
      <input
        className={cx(
          "border-0 w-full py-1.5 pl-1.5 pr-7 my-1 focus:outline-none focus:ring focus:border-blue-300 shadow-md",
          formState.touched[props.name] && formState.errors[props.name] && !props.dontShowError && "border-red-600 border border-solid"
        )}
        type={props.type === 'password' ? (open ? 'text' : props.type) : props.type}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        ref={ref}
        onBlur={props.onBlur}
      />
      {props.type === 'password' && <span className={cx("absolute cursor-pointer right-1", props.topClass ? props.topClass : "top-3")}> {open ? <Icon icon='eye-off' onClick={() => setOpen(prv => !prv)} /> : <Icon icon='eye' onClick={() => setOpen(prv => !prv)} />}</span>}

      {!!formState.touched[props.name] && !!formState.errors[props.name] && !props.dontShowError && (
        <p className="text-red-600">{formState.errors[props.name].message}</p>
      )}
    </div>
  );
});

export { Input };
