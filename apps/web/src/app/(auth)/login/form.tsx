"use client";

import { Input } from "@logicate/ui/input/index";
import { SubmitButton } from "@logicate/ui/submit-button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { authenticate } from "./action";

const errorCodes = {
  "no-credentials": "Invalid email or password",
  "not-verified": "Your email has not been verified",
  "invalid-credentials": "Invalid email or password",
  "exceeded-login-attempts":
    "Account has been locked due to too many login attempts. Please contact support to unlock your account.",
  "too-many-login-attempts": "Too many login attempts. Please try again later.",
};

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const error = searchParams?.get("error");
    error && toast.error(error);
  }, [searchParams]);

  useEffect(() => {
    if (errorMessage && errorMessage !== "success") {
      toast.error(
        errorCodes[errorMessage as keyof typeof errorCodes] || errorMessage,
      );
    } else if (errorMessage === "success") {
      toast.success("Login successful");
      router.push("/");
    }
  }, [errorMessage]);

  return (
    <form
      className="h-full flex flex-col justify-center items-center w-full"
      action={dispatch}
    >
      <div className="flex flex-col justify-start items-start relative">
        <h2 className="font-medium text-2xl">Login</h2>
        <p className="text-neutralgrey-800">
          Enter your details below to login to your account
        </p>
        <div className="flex mt-4 flex-col w-full justify-start gap-4 items-start">
          <Input
            placeholder="john@smith.com"
            required
            className="invalid:placeholder-shown:border-neutralgrey-500 w-full"
            name="email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="********"
            required
            className="invalid:placeholder-shown:border-neutralgrey-500 w-full"
            name="password"
            id="password"
            type="password"
            inputSize="sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <Button className="w-full" variant="dark" disabled={pending}>
            {pending ? "Logging in..." : "Login"}
          </Button> */}
          <SubmitButton className="w-full" variant="dark">
            Login
          </SubmitButton>
          {errorMessage && errorMessage !== "success" && (
            <p className="text-red-700 max-w-xs absolute -bottom-24">
              {errorCodes[errorMessage as keyof typeof errorCodes] ||
                errorMessage}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
