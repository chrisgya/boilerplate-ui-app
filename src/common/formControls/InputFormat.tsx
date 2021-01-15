import React, { FC } from "react";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import cx from "classnames";
import { Controller, useFormContext } from "react-hook-form";

type InputFormatProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    NumberFormatProps & {
        label: string;
        name: string;
    };

//can be use for password, numbers, amount, phone, credit card and any other format...reference documentation for more details
//https://www.npmjs.com/package/react-number-format
const InputFormat: FC<InputFormatProps> = ({
    label,
    name,
    type,
    thousandSeparator,
    decimalSeparato,
    allowNegative,
    prefix,
    suffix,
    format,
    mask,
    allowEmptyFormatting,
    decimalScale,
    isNumericString,
}) => {
    const { control, formState } = useFormContext();

    return (
        <div className="block my-3">
            <label className="block" htmlFor={name}>
                {label}
            </label>
            <Controller
                as={NumberFormat}
                type={type}
                control={control}
                name={name}
                className={cx("border-0 w-full p-1.5 my-0.5 focus:outline-none focus:ring focus:border-blue-300 shadow-md", formState.touched[name] &&
                    formState.errors[name] && "border-red-600 border border-solid")}
                thousandSeparator={thousandSeparator}
                decimalSeparato={decimalSeparato}
                allowNegative={allowNegative}
                prefix={prefix}
                suffix={suffix}
                format={format}
                mask={mask}
                decimalScale={decimalScale}
                allowEmptyFormatting={allowEmptyFormatting}
                isNumericString={isNumericString}
            />
            {formState.touched[name] && formState.errors[name] && (
                <p className="text-red-600">
                    {formState.errors[name].message}
                </p>
            )}
        </div>
    );
};

export { InputFormat };
