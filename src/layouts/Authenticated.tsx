import Sidebar from '@/layouts/sidebar/Sidebar'
import Merchant from '@/modules/merchant';
import { useUserStore } from '@/stores/user';
import { Outlet } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import TopBar from '@/layouts/topbar';

const Authenticated: React.FC = () => {
    const { user } = useUserStore(
        useShallow((state) => ({
            user: state.user
        }))
    )

    return (
        user?.merchant ? (
        <div className='flex flex-row'>
            <div>
                <Sidebar />
            </div>
            <div className="w-full h-screen bg-transparent">
                <TopBar />
                <div className='px-16 py-4'>
                    <Outlet />
                </div>
            </div>
        </div>
        ) : (
            <Merchant />
        )
    )
}

export default Authenticated