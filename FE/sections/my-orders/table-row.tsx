import { TableRow, TableCell } from "@/components/ui/table";

export default function MyTableOrder() {
  return (
    <TableRow key={invoice.invoice}>
      <TableCell className="font-medium">{invoice.invoice}</TableCell>
      <TableCell>{invoice.paymentStatus}</TableCell>
      <TableCell>{invoice.paymentMethod}</TableCell>
      <TableCell className="">{invoice.totalAmount}</TableCell>
    </TableRow>
  );
}
