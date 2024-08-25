"use client";

import { DashIcon } from "@radix-ui/react-icons";
import { OTPInput, OTPInputContext } from "input-otp";
import * as React from "react";
import { cn } from "@logicate/ui";
import { AnimatePresence, motion } from "framer-motion";

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName,
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-wrap items-center justify-center gap-1",
      className,
    )}
    {...props}
  />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  // @ts-ignore
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      // className={cn(
      //   'border-neutralgrey-400 dark:border-neutralgrey-1100 relative flex h-9 w-9 items-center justify-center border-y border-r text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
      //   isActive && 'ring-neutralgrey-1300 dark:ring-neutralgrey-500 z-10 ring-1',
      //   className
      // )}
      className="ring-neutralgrey-500 relative h-10 w-9 rounded-md bg-white ring-1 ring-inset data-[status=selected]:bg-blue-600/10 data-[status=selected]:shadow-[0_0_8px_2px_theme(colors.blue.600/30%)] data-[status=selected]:ring-blue-600"
      {...props}
    >
      <AnimatePresence>
        {char && (
          <motion.span
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            className="text-neutralgrey-1300 absolute inset-0 flex items-center justify-center"
          >
            {char}
          </motion.span>
        )}
        {char}
      </AnimatePresence>
      {hasFakeCaret && (
        <motion.div
          layoutId="otp-input-focus"
          transition={{ ease: [0.2, 0.4, 0, 1], duration: 0.2 }}
          className="absolute inset-0 z-10 rounded-[inherit] border border-blue-600 bg-blue-600/10 shadow-[0_0_8px_2px_theme(colors.blue.600/30%)]"
        />
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <DashIcon />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
