import type { TdHTMLAttributes } from "react";

const Row = ({ children }: TdHTMLAttributes<HTMLTableRowElement>) => {
    return (
        <tr className='border-b border-l border-r border-gray-100 even:bg-gray-50'>
            { children }
        </tr>
    );
}

export default Row