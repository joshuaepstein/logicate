"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { forwardRef } from "react"

import { cn } from "@/lib"

import { Button } from "../button"
import { Popover, PopoverContent, PopoverTrigger } from "../popover"
import { Calendar } from "./calendar"

export const DatePicker = forwardRef<
  HTMLDivElement,
  {
    date?: Date
    setDate: (date?: Date) => void
  }
>(function DatePickerCmp({ date, setDate }, ref) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"borders"}
          className={cn("w-full justify-start text-left font-normal", !date && "dark:neutralgrey-600 text-neutralgrey-700")}
        >
          <CalendarIcon className="mr-2 size-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" ref={ref}>
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  )
})
