import { mergeClass } from "@/utils/tailwind";
import {
    createContext,
    useContext,
    useMemo,
    type ReactNode,
  } from "react";
import { drawerStyle } from "@component/Drawer/drawerStyle";


interface DrawerContextValue {
    isOpen: boolean;
    open: boolean;
    onClose: (open: boolean) => void;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

const useDrawerContext = (component: string): DrawerContextValue => {
    const ctx = useContext(DrawerContext);

    if (ctx === null) {
        throw new Error(
        `<Drawer.${component}> must be rendered inside a <Drawer> provider.`
        );
    }

    return ctx;
}


interface DrawerI {
    children: ReactNode,
    isOpen: boolean;
    open: boolean;
    onClose: () => void;
    drawBodyClass?: string;
}


const Drawer = ({ isOpen, onClose, children, drawBodyClass, open }:DrawerI) => {
    const value = useMemo<DrawerContextValue>(
        () => ({
            isOpen,
            onClose,
            open
        }),
        [isOpen, onClose, open],
    );

    return (
        <DrawerContext.Provider value={value}>
            <div
            className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
                isOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
        >
        <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={onClose}
        />

            <div
                className={mergeClass(drawerStyle, isOpen ? "translate-x-0" : "translate-x-full", drawBodyClass)}
            >
                { children }
            </div>
        </div>
        </DrawerContext.Provider>
    )
}

const DrawerBody = ({ children }: any) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">{ children }</div>
  );
}

interface DrawerHeaderI {
    children: ReactNode,
}

const DrawerHeader = ({ children }: DrawerHeaderI) => {
    const {onClose, open} = useDrawerContext("DrawerHeader")

    return (
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            { children }
          <button
            onClick={() => onClose(!open)}
            className="text-gray-500 hover:text-black text-2xl font-bold focus:outline-none"
          >
            &times;
          </button>
        </div>
    )
}

export {
    Drawer,
    DrawerHeader,
    DrawerBody
}
