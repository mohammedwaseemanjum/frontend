import { Grid3x2 } from 'lucide-react'
import { NavLink } from 'react-router-dom';

const parent = (
    <div className='flex flex-row items-center gap-2 py-4'>
        <Grid3x2 size={25}/>
        <NavLink to="/categories" className='text-lg'>Category</NavLink>
    </div>
)

const data = {
    parent,
}

export default data