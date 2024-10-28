"use client"

import LoadingCircle from "@/components/ui/icons/loading-circle"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Classroom } from "@/database"
import { cn } from "@/lib"
import { Check01Icon, X03Icon } from "@jfstech/icons-react/24/outline"
import { useEffect, useState, useTransition } from "react"
import { useDebounce } from "use-debounce"
import { updateClassroomName } from "./action"

export default function NameInput({ classroom }: { classroom: Classroom }) {
  const [updating, update] = useTransition()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [name, setName] = useState(classroom.name)
  const [debouncedName] = useDebounce(name, 2000)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    update(async () => {
      setSuccess(false)
      setError(false)
      const res = await updateClassroomName(classroom.id, debouncedName)
      if (res) setSuccess(true)
      else setError(true)

      timeout = setTimeout(() => {
        setSuccess(false)
        setError(false)
      }, 3000)
    })
    return () => clearTimeout(timeout)
  }, [debouncedName])

  return (
    <div className="mt-8 flex flex-col gap-2">
      <Label htmlFor="classroom-name">Classroom Name</Label>
      <div className="relative h-max w-full max-w-md">
        <Input
          id="classroom-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="classroom-name"
          className="w-full"
          placeholder="Classroom Name"
        />
        <LoadingCircle
          className={cn("absolute right-3 top-1/2 z-20 -translate-y-1/2 opacity-0 transition", {
            "opacity-100": updating,
          })}
        />
        <Check01Icon
          className={cn("text-green-1000 absolute right-2 top-1/2 z-20 size-6 -translate-y-1/2 opacity-0 transition", {
            "opacity-100": success,
          })}
        />
        <X03Icon
          className={cn("text-red-1000 absolute right-2 top-1/2 z-20 size-6 -translate-y-1/2 opacity-0 transition", {
            "opacity-100": error,
          })}
        />
      </div>
    </div>
  )
}
