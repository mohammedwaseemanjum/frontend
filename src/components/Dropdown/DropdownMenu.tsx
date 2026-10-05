import { useDropdownContext } from "@component/Dropdown/context";
import type { ReactNode } from "react";

const DropdownMenu = ({ children }: { children: ReactNode }) => {
    const { open } = useDropdownContext("DropdownMenu");

    if (!open) return null;

    return (
        <div className="absolute border border-gray-200 w-full mt-1 rounded-md px-2 py-1 z-50 bg-white shadow-sm max-h-50 overflow-auto">
            { children }
        </div>
    )
}

export default DropdownMenu