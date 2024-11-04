import { cn } from "@/lib"

export default async function CreatedLogin(props: { searchParams: Promise<{ email: string; success: string }> }) {
  const { email, success } = await props.searchParams

  return (
    <div className="flex h-full min-h-[80dvh] w-full items-center justify-center">
      <div
        className={cn("shadow-hard-soft-2xs-green flex w-full max-w-lg flex-col items-center justify-center gap-4 rounded-lg px-4 py-8", {
          "bg-green-100": success === "true",
        })}
      >
        <h1 className={cn("text-neutralgrey-1200 text-lg font-medium", { "text-green-1000": success === "true" })}>Account Created</h1>
        <p className={cn("text-center text-sm", { "text-green-1100/50": success === "true" })}>
          Your account has been created successfully with the email {email}. Please check your email for verification.
        </p>
      </div>
    </div>
  )
}
