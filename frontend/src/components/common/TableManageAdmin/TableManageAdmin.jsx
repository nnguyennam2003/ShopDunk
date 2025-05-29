import LoadingBtn from "@/components/common/Loading/LoadingBtn";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


export function TableManageAdmin({ columns, data, isLoading }) {
    if (isLoading) {
        return <div className="flex items-center justify-center h-[50vh]"><LoadingBtn /></div>
    }
    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    {columns.map((col, idx) => (
                        <TableHead key={idx} className={col.className}>
                            {col.label}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {columns.map((col, colIndex) => (
                            <TableCell key={colIndex} className={col.className}>
                                {col.render ? col.render(row, rowIndex) : row[col.key]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
