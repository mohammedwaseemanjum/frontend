import { ChevronDown, ChevronUp } from 'lucide-react'
import { useMemo } from 'react'
import { useSibeBarContext } from "@layout/sidebar/context"

interface SideBarMenuI {
    children: React.ReactNode;
    hasChildren: Boolean | undefined;
}

const SideBarMenu:React.FC<SideBarMenuI> = ({ children, hasChildren }) => {
    const { open, setOpen } = useSibeBarContext();
    const Chevron = useMemo(() => open ? ChevronUp : ChevronDown, [open])

    return (
        <div onClick={() => setOpen(!open)}>
            <div className='hover:bg-gray-50 rounded-lg flex flex-row items-center bg-white justify-between px-4 cursor-pointer'>
                { children }
                <div className={`${hasChildren ? 'visible' : 'hidden'}`}>
                    <Chevron size={20} />
                </div>
            </div>
        </div>
    )
}

export default SideBarMenu