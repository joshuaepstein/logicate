'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/index'
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/modal'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/not-done-yet/accordion'
import { Textarea } from '@/components/ui/textarea'
import { useActionState, useState } from 'react'
import { createChangelog } from './action'

export default function ChangelogForm() {
  const [error, formAction] = useActionState(createChangelog, undefined)

  const [additions, setAdditions] = useState<string[]>([])
  const [changes, setChanges] = useState<string[]>([])
  const [fixes, setFixes] = useState<string[]>([])

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="additions_length" value={additions.length} />
      <input type="hidden" name="changes_length" value={changes.length} />
      <input type="hidden" name="fixes_length" value={fixes.length} />
      <DialogHeader>
        <DialogTitle>Create Changelog</DialogTitle>
      </DialogHeader>
      <Input name="title" placeholder="Title" />
      <Textarea name="subtitle" placeholder="Subtitle" />

      <Accordion type="single" collapsible>
        <AccordionItem value="additions">
          <AccordionTrigger>
            Additions
            <Button
              variant="borders"
              onClick={(e) => {
                e.preventDefault()
                setAdditions([...additions, ''])
              }}
              type="button"
            >
              Add
            </Button>
          </AccordionTrigger>
          <AccordionContent>
            {additions.map((addition, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  key={index}
                  name={`additions-${index}`}
                  placeholder="Additions"
                  value={addition}
                  onChange={(e) => {
                    const newAdditions = [...additions]
                    newAdditions[index] = e.target.value
                    setAdditions(newAdditions)
                  }}
                />
                <Button
                  variant="borders"
                  onClick={() => {
                    setAdditions(additions.filter((_, i) => i !== index))
                  }}
                  type="button"
                >
                  Remove
                </Button>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="changes">
          <AccordionTrigger>
            Changes
            <Button
              variant="borders"
              onClick={(e) => {
                e.preventDefault()
                setChanges([...changes, ''])
              }}
              type="button"
            >
              Add
            </Button>
          </AccordionTrigger>
          <AccordionContent>
            {changes.map((change, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  key={index}
                  name={`changes-${index}`}
                  placeholder="Changes"
                  value={change}
                  onChange={(e) => {
                    const newChanges = [...changes]
                    newChanges[index] = e.target.value
                    setChanges(newChanges)
                  }}
                />
                <Button
                  variant="borders"
                  onClick={() => {
                    setChanges(changes.filter((_, i) => i !== index))
                  }}
                  type="button"
                >
                  Remove
                </Button>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="fixes">
          <AccordionTrigger>
            Fixes
            <Button
              variant="borders"
              onClick={(e) => {
                e.preventDefault()
                setFixes([...fixes, ''])
              }}
              type="button"
            >
              Add
            </Button>
          </AccordionTrigger>
          <AccordionContent>
            {fixes.map((fix, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  key={index}
                  name={`fixes-${index}`}
                  placeholder="Fixes"
                  value={fix}
                  onChange={(e) => {
                    const newFixes = [...fixes]
                    newFixes[index] = e.target.value
                    setFixes(newFixes)
                  }}
                />
                <Button
                  variant="borders"
                  onClick={() => {
                    setFixes(fixes.filter((_, i) => i !== index))
                  }}
                  type="button"
                >
                  Remove
                </Button>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <DialogFooter>
        <Button type="submit">Create</Button>
        {error && <p className="text-red-500">{error}</p>}
      </DialogFooter>
    </form>
  )
}
