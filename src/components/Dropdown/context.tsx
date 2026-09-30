import { createContext, useContext } from "react";

export interface DropdownContextValue {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

const useDropdownContext = (component: string): DropdownContextValue => {
    const ctx = useContext(DropdownContext);
    if (ctx === null) {
        throw new Error(
        `<Dropdown.${component}> must be rendered inside a <Dropdown> provider.`
        );
    }
    return ctx;
}

export {
    useDropdownContext,
    DropdownContext,
}