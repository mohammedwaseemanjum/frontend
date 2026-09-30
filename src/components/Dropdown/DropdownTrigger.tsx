import { mergeClass } from "@/utils/tailwind";
import { type ReactNode, type InputHTMLAttributes } from "react";
import { useDropdownContext } from "@component/Dropdown/context";

interface DropdownTriggerProps extends InputHTMLAttributes<HTMLDivElement> {
    children: ReactNode,
    className?: string;
}

const style = `border-2 border-gray-200 flex flex-row items-center rounded-md w-full cursor-pointer px-4 py-4 text-sm justify-end`

const DropdownTrigger = ({ children, className }: DropdownTriggerProps) => {
    const { open, setOpen } = useDropdownContext("Trigger");

    return (
        <div 
            className={mergeClass(style, className)} 
            onClick={() => setOpen(!open)}
        >
            { children }
            <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className={`h-4 w-4 text-zinc-500 transition-transform duration-200 motion-reduce:transition-none ${
                    open ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 8 4 4 4-4" />
            </svg>
        </div>
    )
}

export default DropdownTrigger