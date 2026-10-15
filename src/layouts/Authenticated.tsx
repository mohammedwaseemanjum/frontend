import Sidebar from '@/layouts/sidebar/Sidebar'
import { Outlet } from 'react-router-dom';
import TopBar from '@/layouts/topbar';
import Merchant from '@/modules/merchant';
import { UserRole, useUserStore } from '@/stores/user';
import { useShallow } from 'zustand/shallow';

const Authenticated: React.FC = () => {
    const { user } = useUserStore(
        useShallow((state) => ({
          user: state.user,
        }))
    )

    return (
        <div className='flex flex-row'>
            <div>
                <Sidebar />
            </div>
            <div className="w-full h-screen bg-transparent">
                <TopBar />
                <div className='px-16 py-4'>
                    <Outlet />
                    { !user?.merchant && user?.roles?.includes(UserRole.Merchant) && <Merchant /> }
                </div>
            </div>
        </div>
    )
}

export default Authenticated