import Logo from '@/assets/logo.png'
import HeroBanner from '@/assets/pizza.png'
import FoodChef from '@/assets/chicken_zilla.jpg'
import Chicken from '@/assets/food_chef.jpg'
import ChefGanteng from '@/assets/chef_ganteng.png'
import MasterChef from '@/assets/master_chef.jpg'
import Organic from '@/assets/organic.jpg'

const Blog: React.FC = () => {
    return (
        <div className="bg-transparent px-30 flex flex-col">
            <div className='w-50 py-4'>
                <div className='w-50'>
                    <img src={Logo} className='object-contain'/>
                </div>
            </div>
            <div className='-ml-30 -mr-30 relative'>
                <img src={HeroBanner} className='w-full h-auto object-cover'/>
                <div className='absolute inset-0 flex flex-col items-start px-30 py-20 gap-10 w-230'>
                    <span className='text-white text-6xl font-bold'>
                        Order Healthy and Fresh Food Any Time
                    </span>
                    <span className='text-gray-500 text-lg font-bold w-150'>
                        Italian food makes people think of big family dinners. So you may want to position your restaurant as a place to bring the whole family.
                    </span>
                    <div>
                        <p className='mb-4 text-white text-2xl font-bold'>Popular Restuarants</p>
                        <div className='flex flex-row gap-4'>
                            <div className='w-15'>
                                <img src={FoodChef} className='object-contain rounded-lg'/>
                            </div>
                            <div className='w-15'>
                                <img src={Chicken} className='object-contain rounded-lg'/>
                            </div>
                            <div className='w-15'>
                                <img src={ChefGanteng} className='object-contain rounded-lg'/>
                            </div>
                            <div className='w-15'>
                                <img src={MasterChef} className='object-contain rounded-lg'/>
                            </div>
                            <div className='w-15'>
                                <img src={Organic} className='object-contain rounded-lg'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                Footer
            </div>
        </div>
    )
}

export default Blog