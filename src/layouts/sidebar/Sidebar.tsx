import Menus from '@layout/sidebar/Menus'
import { CircleUser } from 'lucide-react'
import { useUserStore } from "@/stores/user";
import { useShallow } from 'zustand/react/shallow';

const SideBar: React.FC = () => {
    const { user } = useUserStore(
          useShallow((state) => ({
            user: state.user,
          }))
    )

    return (
        <div className="bg-blue-100 h-screen px-4 py-5 flex flex-col gap-2 w-[300px]">
            <div className="flex flex-row items-center gap-2 bg-blue-200 rounded-lg p-4">
                <CircleUser size={40}/>
                { user?.name }
            </div>
            <Menus />
        </div> 
    )
}

export default SideBar