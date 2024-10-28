import LoadingCircle from "@/components/ui/icons/loading-circle"
import { getSession } from "@/lib/auth/utils"
import { Suspense } from "react"
import ClientJoin from "./client"

// TODO: What if they are joining as a teacher?
export default async function Join(props: { params: Promise<{ code: string }> }) {
  const session = getSession()

  return (
    <Suspense
      fallback={
        <div className="flex h-full min-h-[80dvh] w-full items-center justify-center">
          <div className="shadow-hard-soft-2xs flex w-full max-w-lg flex-col items-center justify-center gap-4 rounded-lg px-4 py-8">
            <div className="flex items-center justify-center gap-4">
              <LoadingCircle className="size-4" />
              <h1 className="text-xl font-medium">Joining classroom...</h1>
            </div>
            <p className="text-neutralgrey-1200 text-sm">This may take a few seconds.</p>
          </div>
        </div>
      }
    >
      <ClientJoin session={session} params={props.params} />
    </Suspense>
  )
}
