import { mergeClass } from '@/utils/tailwind';
import { CircleUser } from 'lucide-react'
import { User } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState<Boolean>(false)

    return (
        <div className='flex flex-row pr-10 py-3 border-b border-gray-100'>
            <div className='ml-auto relative'>
                <CircleUser size={40} className='cursor-pointer' onClick={() => {
                    setOpen(!open)
                }}/>

                <div className={mergeClass(open ? 'block' : 'hidden', 'absolute right-2 border border-gray-200 mt-1 rounded-md z-50 bg-white shadow-sm max-h-50 w-50 [&>div]:border-b [&>div]:border-gray-200')}>
                    <div className='flex flex-row p-3 cursor-pointer hover:bg-gray-100' onClick={() => {
                        navigate('profile')
                    }}>
                        <User size={20} /> 
                        <span className='ml-2'>Profile</span>
                    </div>
                    
                    <div className='p-3'>
                        <div className="bg-red-400 rounded-md p-2 text-center cursor-pointer h-8.5 items-center justify-center flex flex-row" onClick={() => console.log(1)}>
                            <LogOut size={20} color='white'/>
                            <span className="font-bold text-white text-sm ml-2">Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar