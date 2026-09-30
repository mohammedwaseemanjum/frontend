import {
    useMemo,
    useState,
    type ReactNode,
} from "react";

import { 
    type DropdownContextValue, 
    DropdownContext 
} from "@component/Dropdown/context";

import DropdownMenu from "@component/Dropdown/DropdownMenu";
import DropdownItem from "@component/Dropdown/DropdownItem";
import DropdownTrigger from "@component/Dropdown/DropdownTrigger";

interface DropdownProps {
    children: ReactNode
}

const Dropdown = ({ children }:DropdownProps) => {
    const [open, setOpen] = useState<boolean>(false)

    const value = useMemo<DropdownContextValue>(
        () => ({
          open,
          setOpen
        }),
        [open],
    );0

    return (
        <DropdownContext.Provider value={value}>
            <div className={`relative text-left`}>
                { children }
            </div>
        </DropdownContext.Provider>
    )
}
  
export { 
    Dropdown,
    DropdownMenu,
    DropdownItem,
    DropdownTrigger
};