"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Button } from "../button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { cn } from "@logicate/ui";

export function DatePickerWithRange({
  className,
  date: date_,
  setDate: setDate_,
}: React.HTMLAttributes<HTMLDivElement> & {
  date: DateRange;
  setDate: (date: DateRange | undefined) => boolean;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>(date_);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"borders"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-neutralgrey-700 dark:text-neutralgrey-600",
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(v) => {
              if (setDate_(v)) {
                setDate(v);
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
