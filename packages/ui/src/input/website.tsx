"use client";

import { cn } from "@logicate/ui";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React from "react";
import { InputProps, inputVariants } from ".";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../select";

const WebsiteInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant,
      children,
      defaultValue,
      disabled,
      inputSize,
      debug,
      ...props
    },
    ref,
  ) => {
    const [http, setHttp] = React.useState("https://");
    const [value, setValue] = React.useState(
      defaultValue
        ? (defaultValue as string).includes("http")
          ? (defaultValue as string)
          : http + (defaultValue as string)
        : http + "",
    );

    return (
      <div className="shadow-soft-2xs flex flex-row items-center rounded-lg">
        <Select
          value={http}
          onValueChange={(newValue) => {
            setValue((prev) => {
              return prev.replace(http, newValue);
            });
            setHttp(newValue);
          }}
        >
          <SelectTrigger
            hideIcon
            defaultStyles={false}
            className={cn(
              "border-neutralgrey-500 bg-base-background text-neutralgrey-900 focus-visible:border-neutralgrey-500 flex h-full appearance-none flex-row items-center justify-center rounded-l-lg rounded-r-none border border-r-0 px-2 text-sm focus-visible:outline-none",
              {
                "opacity-50": disabled || debug === "disabled",
              },
            )}
          >
            {http}
            <ChevronDownIcon className="size-5" />
          </SelectTrigger>
          <SelectContent>
            {/* <div className="flex flex-col gap-1">
              <button className="flex flex-row items-center gap-2 px-2 py-1 text-sm text-neutralgrey-900 hover:bg-neutralgrey-200">
                https://
              </button>
              <button className="flex flex-row items-center gap-2 px-2 py-1 text-sm text-neutralgrey-900 hover:bg-neutralgrey-200">
                http://
              </button>
            </div> */}
            <SelectItem value="https://">https://</SelectItem>
            <SelectItem value="http://">http://</SelectItem>{" "}
          </SelectContent>
        </Select>
        <input
          type={"url"}
          value={value.replace(http, "")}
          onChange={(e) => {
            setValue(http + e.target.value);
          }}
          className={cn(
            inputVariants({
              variant,
              inputSize,
              debug,
              className,
            }),
            "peer rounded-l-none !shadow-none",
          )}
          ref={ref}
          disabled={disabled || debug === "disabled"}
          {...(debug && { "data-debug": debug })}
          {...(debug === "error" && {
            "aria-invalid": true,
            "aria-describedby": "error-message",
          })}
          {...props}
        />
      </div>
    );
  },
);

WebsiteInput.displayName = "WebsiteInput";

export { WebsiteInput };
