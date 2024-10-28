"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { SubmitButton } from "@/components/ui/submit-button"
import { Textarea } from "@/components/ui/textarea"
import { H4 } from "@/components/ui/typography"
import { useActionState, useEffect, useRef } from "react"
import { toast } from "sonner"
import { createClassroom } from "./action"

export function CreateClassroomForm() {
  const [formState, performAction] = useActionState(createClassroom, undefined)
  const emailsRef = useRef<HTMLTextAreaElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        emailsRef.current!.value = content
        toast.success("File uploaded")
      }
      reader.readAsText(file)
    }
  }

  useEffect(() => {
    if (formState?.success) {
      toast.success(formState.value)
    } else if (formState?.error) {
      toast.error(formState.error)
    }
  }, [formState])

  return (
    <form action={performAction} className="mt-4 max-w-lg space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Classroom Name</Label>
        <Input id="name" name="name" placeholder="Classroom Name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea id="description" name="description" placeholder="Classroom Description" />
      </div>

      <H4>Invite Students</H4>

      <Textarea placeholder="Student Emails" name="emails" className="min-h-[200px]" ref={emailsRef} />
      <p className="text-neutralgrey-800 text-sm">Enter email addresses, one per line</p>
      <p className="text-neutralgrey-1200 text-center text-sm font-semibold uppercase">Or</p>
      <Input type="file" accept=".txt,.csv" onChange={handleFileUpload} />
      <p className="text-neutralgrey-800 text-sm">Upload a .txt or .csv file with one email per line</p>
      <SubmitButton type="submit">Create Classroom</SubmitButton>
      {formState && formState.success ? (
        <p className="text-green-800">{formState.value}</p>
      ) : (
        formState && <p className="text-red-800">{formState.error}</p>
      )}
    </form>
  )
}
