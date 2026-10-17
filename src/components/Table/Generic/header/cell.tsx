import type { ThHTMLAttributes } from "react";
import { mergeClass } from "@/utils/tailwind";

const HeaderCell = ({ children, className }: ThHTMLAttributes<HTMLTableCellElement>) => {
    return (
        <th className={mergeClass('bg-gray-200 p-3 text-left', className)}>
            { children }
        </th>
    )
}

export default HeaderCell