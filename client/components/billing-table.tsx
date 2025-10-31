import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";

export function BillingHistoryTable() {
  const invoices = [
    {
      id: 1537,
      month: "Dec 2024",
      date: "Dec 1, 2024",
      amount: "$540",
      status: "Paid",
    },
    {
      id: 1538,
      month: "Nov 2024",
      date: "Nov 1, 2024",
      amount: "$540",
      status: "Paid",
    },
  ];

  return (
    <div className="rounded-2xl border p-6 my-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">Billing History</h2>
          <p className="text-sm text-muted-foreground">
            Download your previous plan receipts and usage details.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Download CSV
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Billing Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                Invoice #{invoice.id} - {invoice.month}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">Paid</Badge>
              </TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.amount}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" /> Download
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
