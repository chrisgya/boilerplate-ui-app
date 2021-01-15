import React, { FC } from "react";
import cx from "classnames";
import { useFormContext } from "react-hook-form";

type TextAreaProps = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
  label: string;
  name: string;
};

const Textarea: FC<TextAreaProps> = ({ name, label }) => {
  const { register, formState } = useFormContext();

  return (
    <div className="block my-3">
      <label className="block" htmlFor={name}>
        {label}
      </label>
      <textarea
        className={cx(
          "border-0 w-full p-1.5 my-0.5 focus:outline-none focus:ring focus:border-blue-300 shadow-md",
          formState.touched[name] && formState.errors[name] && "border-red-600 border border-solid"
        )}
        name={name}
        id={name}
        ref={register}
      />
      {formState.touched[name] && formState.errors[name] && (
        <p className="text-red-600">{formState.errors[name].message}</p>
      )}
    </div>
  );
};

export { Textarea };
