import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@logicate/ui/table";

export default function TablePage() {
  return (
    <Table className="max-w-md m-10">
      <TableHeader>
        <TableRow>
          <TableHead className="font-mono font-normal">A</TableHead>
          <TableHead className="font-mono font-normal">B</TableHead>
          <TableHead className="font-mono font-normal">A ∨ B</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>True</TableCell>
          <TableCell>True</TableCell>
          <TableCell>True</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>True</TableCell>
          <TableCell>False</TableCell>
          <TableCell>False</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>False</TableCell>
          <TableCell>True</TableCell>
          <TableCell>False</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>False</TableCell>
          <TableCell>False</TableCell>
          <TableCell>False</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
