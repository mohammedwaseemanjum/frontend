import { createContext, useContext, useState } from "react";

interface SideBarMenuI {
  children: React.ReactNode; 
}

export const SideBarContext = createContext<any>(null);

export const useSibeBarContext = () => {
  const context = useContext(SideBarContext);

  if (!context) {
    throw new Error('useSibeBarContext must be used within a SideBarContext');
  }
  
  return context;
};

export const SideBarContextWrapper:React.FC<SideBarMenuI> = ({ children }) => {
    const [open, setOpen] = useState<Boolean>(false)

    return (
        <SideBarContext.Provider value={{open, setOpen}}>
            { children }
        </SideBarContext.Provider>
    )
}