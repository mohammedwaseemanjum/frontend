import { useUserStore } from '@/stores/user';
import { useShallow } from 'zustand/react/shallow';
import { MapPin } from 'lucide-react';
import { CalendarDays } from 'lucide-react';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';

const Profile = () => {
    const { user } = useUserStore(
        useShallow((state) => ({
          user: state.user,
        }))
    )

    const { data } = useQuery({
        queryKey: ['test'],
        queryFn: () => Promise.resolve(5),
    })

    const formattedDate = dayjs(user?.merchant?.createdAt).format('MMMM YYYY');

    return (
        <div className='p-4'>
            <div className='relative border border-gray-200 rounded-md bg-white shadow-sm h-[300px] overflow-hidden'>
                <img className='rounded-tr-md rounded-tl-md' src={`https://res.cloudinary.com/dnjvm8meq/image/upload/v${user?.merchant?.media[0].customProperties.version}/${user?.merchant?.media[0].collection}/${user?.merchant?.media[0].fileName}`} />
                <div className='absolute bottom-0 bg-white w-full h-[80px]'>
                    <div className='absolute rounded-md bg-white w-[100px] bottom-[10px] left-[15px]'>
                        <img 
                            className='rounded-md w-[200px] object-contain p-2' 
                            src={`https://res.cloudinary.com/dnjvm8meq/image/upload/v${user?.merchant?.media[1].customProperties.version}/${user?.merchant?.media[1].collection}/${user?.merchant?.media[1].fileName}`} 
                        />
                    </div>
                    <div className='ml-[120px] mt-2 gap-2 flex flex-col'>
                        <div>
                           <span className='ml-1 font-bold'>{ user?.merchant?.metaData.storeName }</span> 
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='text-xs flex flex-row items-center gap-1'>
                                <MapPin size={20} color={'gray'} /> 
                                <span className='text-gray-500'>
                                    { user?.merchant?.metaData.city } , { user?.merchant?.metaData.barangay } { user?.merchant?.metaData.province } { user?.merchant?.metaData.region }
                                </span>
                            </div>
                            <div className='text-xs flex flex-row items-center gap-1'>
                                <CalendarDays size={18} color={'gray'} /> <span className='text-gray-500'>Joined { formattedDate }</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile