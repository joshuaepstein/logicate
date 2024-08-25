"use client";

import { cn } from "@logicate/ui";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";

import React from "react";
import { InputProps, inputVariants } from ".";
import { Button } from "../button";

const QuantityInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant, children, disabled, inputSize, debug, ...props },
    ref,
  ) => {
    const inputReference = React.useRef<HTMLInputElement>(null);

    return (
      <div className="shadow-soft-2xs relative flex w-max flex-row items-center rounded-lg">
        <div className="absolute inset-y-0 right-2 flex items-center justify-center gap-2">
          <Button
            variant="secondary"
            size={inputSize === "sm" ? "icon-2xs" : "icon-sm"}
            onClick={() => {
              var currentValue = parseInt(inputReference.current?.value || "0");
              if (currentValue > 0 && inputReference.current) {
                inputReference.current.value = (currentValue - 1).toString();
              }
            }}
            aria-label="Decrement value"
            title="Decrement value"
            type="button"
          >
            <MinusIcon
              className={cn({
                "h-4 w-4": inputSize === "sm",
                "h-5 w-5": inputSize === "lg",
              })}
            />
          </Button>
          <Button
            variant="secondary"
            size={inputSize === "sm" ? "icon-2xs" : "icon-sm"}
            aria-label="Increment value"
            title="Increment value"
            type="button"
            onClick={() => {
              var currentValue = parseInt(inputReference.current?.value || "0");
              var maxValue = parseInt(inputReference.current?.max || "-1");
              if (
                (currentValue < maxValue || maxValue === -1) &&
                inputReference.current
              ) {
                inputReference.current.value = (currentValue + 1).toString();
              }
            }}
          >
            <PlusIcon
              className={cn({
                "h-4 w-4": inputSize === "sm",
                "h-5 w-5": inputSize === "lg",
              })}
            />
          </Button>
        </div>
        <input
          type={"number"}
          className={cn(
            inputVariants({
              variant,
              inputSize,
              debug,
              className,
            }),
          )}
          //   ref={ref}
          ref={inputReference}
          {...(!props.value && !props.defaultValue && { defaultValue: 0 })}
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

QuantityInput.displayName = "QuantityInput";

export { QuantityInput };
