"use client"

import LoadingCircle from "@/components/ui/icons/loading-circle"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Classroom } from "@/database"
import { cn } from "@/lib"
import { Check01Icon, X03Icon } from "@jfstech/icons-react/24/outline"
import { useEffect, useState, useTransition } from "react"
import { useDebounce } from "use-debounce"
import { updateClassroomDescription } from "./action"

export default function DescriptionInput({ classroom }: { classroom: Classroom }) {
  const [updating, update] = useTransition()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [description, setDescription] = useState(classroom.description)
  const [debouncedDescription] = useDebounce(description, 2000)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    update(async () => {
      setSuccess(false)
      setError(false)
      const res = await updateClassroomDescription(classroom.id, debouncedDescription ?? "")
      if (res) setSuccess(true)
      else setError(true)

      timeout = setTimeout(() => {
        setSuccess(false)
        setError(false)
      }, 3000)
    })
    return () => clearTimeout(timeout)
  }, [debouncedDescription])

  return (
    <div className="mt-8 flex flex-col gap-2">
      <Label htmlFor="classroom-description">Classroom Description</Label>
      <div className="relative h-max w-full max-w-md">
        <Textarea
          id="classroom-description"
          value={description ?? ""}
          onChange={(e) => setDescription(e.target.value)}
          name="classroom-description"
          className="w-full"
          placeholder="Classroom Description"
        />
        <LoadingCircle
          className={cn("absolute right-3 top-3 z-20 opacity-0 transition", {
            "opacity-100": updating,
          })}
        />
        <Check01Icon
          className={cn("text-green-1000 absolute right-2 top-3 z-20 size-6 opacity-0 transition", {
            "opacity-100": success,
          })}
        />
        <X03Icon
          className={cn("text-red-1000 absolute right-2 top-3 z-20 size-6 opacity-0 transition", {
            "opacity-100": error,
          })}
        />
      </div>
    </div>
  )
}
