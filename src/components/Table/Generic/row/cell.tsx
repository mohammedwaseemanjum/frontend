import { mergeClass } from "@/utils/tailwind";
import type { TdHTMLAttributes } from "react";

const RowCell = ({ children, className }: TdHTMLAttributes<HTMLTableCellElement>) => {
    return (
        <td className={mergeClass('p-3', className)}>
            { children }
        </td>
    );
}

export default RowCell