import React, { FC } from "react";
import cx from "classnames";

type IButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  useHalfWith?: boolean
};

export const Button: FC<IButtonProps> = ({ name, type, onClick, useHalfWith }) => {

  return (
    <button type={type} onClick={onClick}
      className={cx("w-full px-8 py-2 mt-2 font-semibold transition duration-500 ease-in-out transform rounded-sm shadow-xl focus:ring focus:outline-none",
        type === "submit" ? "text-white bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700" :
          "bg-white border hover:border-black hover:bg-black hover:text-white", useHalfWith && "lg:w-1/2")}>{name}</button>
  );
};
