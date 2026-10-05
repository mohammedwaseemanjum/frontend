import { useSibeBarContext } from "@layout/sidebar/context"

interface SideBarMenuI {
    children: React.ReactNode; 
}

const SideBarChildren:React.FC<SideBarMenuI> = ({ children }) => {
    const { open } = useSibeBarContext();
    
    return (
        <div className={`${open ? 'visible' : 'hidden'}`}>
            <div className='flex flex-row justify-start items-center gap-2 hover:bg-green-300 p-5 rounded-lg'>
                { children }
            </div>
        </div>
    )
}

export default SideBarChildren