import LogoIcon from "@/components/Logo"
import { Container } from "@/components/ui/not-done-yet/container"
import { get } from "@vercel/edge-config"
import { redirect } from "next/navigation"

export default async function Maintenance() {
  const isMaintenance = (await get("isMaintenance")) ?? false
  const maintenanceMessage = (await get("maintenanceMessage")) || "We are currently under maintenance. Please check back later."

  if (!isMaintenance) {
    redirect("/")
  }

  return (
    <Container className="mt-0 flex min-h-[calc(100dvh)] flex-col items-center justify-center gap-10">
      <LogoIcon className="h-12" />
      <div className="flex h-max w-max flex-col items-center justify-center">
        <h1 className="mt-4 text-3xl font-semibold">Maintenance</h1>
        <p className="mt-2 text-center text-neutralgrey-900">
          {typeof maintenanceMessage === "string" ? maintenanceMessage : "We are currently under maintenance. Please check back later."}
        </p>
      </div>
    </Container>
  )
}
