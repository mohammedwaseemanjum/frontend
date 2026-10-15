import { NavLink } from 'react-router-dom';
import { Users } from 'lucide-react';

const parent = (
    <div className='flex flex-row items-center gap-2 py-4'>
        <Users size={25}/>
        <NavLink to="/user-management" className='text-lg'>User Management</NavLink>
    </div>
)

const data = {
    parent,
}

export default data