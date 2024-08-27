"use client";

import { Input } from "@logicate/ui/input/index";
import { Label } from "@logicate/ui/label";
import { SubmitButton } from "@logicate/ui/submit-button";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { registerAction } from "./action";

export function RegisterForm() {
  const [state, formAction] = useFormState(registerAction, undefined);

  useEffect(() => {
    if (state && state.success) {
      toast.success(state.value);
      redirect("/welcome");
    }
    if (state && !state.success) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form className="flex w-full flex-col gap-4 mt-4" action={formAction}>
      <div className="flex flex-col w-full gap-2">
        <Label>Name</Label>
        <Input
          placeholder="John Smith"
          className="invalid:placeholder-shown:border-neutralgrey-500 w-full"
          type="text"
          autoComplete="name"
          name="name"
          required
          id="name"
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <Label>Email</Label>
        <Input
          placeholder="john@smith.com"
          className="invalid:placeholder-shown:border-neutralgrey-500 w-full"
          type="email"
          name="email"
          id="email"
          required
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <Label>Username</Label>
        <Input
          placeholder="johnsmith"
          className="invalid:placeholder-shown:border-neutralgrey-500 w-full"
          type="text"
          autoComplete="username"
          name="username"
          id="username"
          required
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <Label>Password</Label>
        <Input
          placeholder="********"
          className="invalid:placeholder-shown:border-neutralgrey-500 w-full"
          type="password"
          autoComplete="new-password"
          name="password"
          id="password"
          required
        />
      </div>

      <SubmitButton variant="dark" className="w-full">
        Signup
      </SubmitButton>

      {state && !state.success && <p className="text-red-700">{state.error}</p>}
    </form>
  );
}
