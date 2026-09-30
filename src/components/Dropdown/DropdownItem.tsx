import { mergeClass } from "@/utils/tailwind";
import { type HTMLAttributes } from "react";
import { useDropdownContext } from "@component/Dropdown/context";

interface DropdownItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
    onSelect?: () => void;
    disabled?: boolean;
    className?: string,
}

const DropdownItem = ({ children, onSelect, className }: DropdownItemProps) => {
    const { open, setOpen } = useDropdownContext("DropdownItem");

    const handleSelect = () => {
        setOpen(!open)
        
        if (open) {
            onSelect?.()
        }
    }

    return (
        <div onClick={handleSelect} className={mergeClass(className)}>
            { children }
        </div>
    )
}

export default DropdownItem