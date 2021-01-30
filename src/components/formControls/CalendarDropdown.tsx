import React, { FC, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Calendar, { CalendarProps } from "react-calendar";
import cx from "classnames";
import { format } from "date-fns";

type DatePickerProps = CalendarProps & {
  name: string;
  intialValue: Date | null;
  dateFormat?: string;
  maxDate?: Date;
  minDate?: Date;
  onChange: (date: Date | Date[]) => void;
};

export const CalendarDropdown: FC<DatePickerProps> = ({
  name,
  minDate,
  maxDate,
  onChange,
  intialValue,
  dateFormat = "dd MMM yyyy",
}) => {
  const { control, formState } = useFormContext();
  const [showCalendar, setshowCalendar] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string | number | readonly string[] | undefined>("");
  const rootRef = React.useRef(null);

  const toggleCalendar = (val?: boolean) => {
    setshowCalendar(val || !showCalendar);
  };

  const handleClickAway = (e: MouseEvent) => {
    const el: any = rootRef.current;
    if (el && !el.contains(e.target)) {
      setshowCalendar(false);
    }
  };

  const onCalendarChange = (date: Date | Date[]) => {
    if (date instanceof Date) {
      onChange(date);
      setInputValue(format(date, dateFormat));
      toggleCalendar(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickAway, false);
    return () => document.removeEventListener("mousedown", handleClickAway, false);
  });

  return (
    <div ref={rootRef}>
      <input
        value={inputValue ? inputValue : intialValue ? format(intialValue, dateFormat) : ""}
        readOnly={true}
        onFocus={() => toggleCalendar(true)}
        className={cx(
          "border-0 w-full p-1.5 my-0.5 focus:outline-none focus:ring focus:border-blue-300 shadow-md",
          formState.touched[name] && formState.errors[name] && "border-red-600 border border-solid"
        )}
      />
      <Controller
        control={control}
        name={name}
        render={({ value }) => (
          <>
            {showCalendar && (
              <Calendar
                onChange={onCalendarChange}
                value={value}
                calendarType="US"
                maxDate={maxDate}
                minDate={minDate}
              />
            )}
            {formState.touched[name] && formState.errors[name] && (
              <p className="text-red-600">{formState.errors[name].message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};
