import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { H3 } from "@/components/ui/typography"
import { Plus01Icon } from "@jfstech/icons-react/24/outline"

export default function Loading() {
  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <H3 className="mt-0">All Students</H3>
        <Button className="flex items-center justify-center gap-2" variant="secondary">
          <Plus01Icon className="size-4" />
          Invite Students
        </Button>
      </div>

      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Progress Level</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-[1.25rem] w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[1.25rem] w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[1.25rem] w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[1.25rem] w-24" />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">10</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  )
}
