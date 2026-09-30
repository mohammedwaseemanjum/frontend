import InputForm from "@/components/Input/InputForm"
import PasswordForm from '@/components/Input/PasswordForm'
import { Popup } from "@/components/Popup";
import { Info } from 'lucide-react';
import useRegisterAction from "./actions/register.action";

const Register = () => {
    const {
        handleSubmit,
        onSubmit,
        control,
        isPopupOpen,
        setIsPopupOpen
    } = useRegisterAction()

  
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="bg-white shadow-md w-[500px] px-4 py-20 rounded-md border border-gray-200 flex flex-col items-center">
                <div className="w-[400px] flex flex-col gap-4">
                    <div>
                        <InputForm id="email" type="email" control={control} name={'email'} label="Email" labelClassName={'text-md!'} className={'h-[60px]!'}/>
                    </div>

                    <div>
                        <PasswordForm id="password" type="password" control={control} name={'password'} label="Password" labelClassName={'text-md!'} className={'h-[60px]!'}/>
                    </div>

                    <div>
                        <PasswordForm id="confirmPassword" type="password" control={control} name={'confirmPassword'} label="Confirm Password" labelClassName={'text-md!'} className={'h-[60px]!'}/>
                    </div>

                    <div>
                        <InputForm id="firstName" type="text" control={control} name={'firstName'} label="First Name" labelClassName={'text-md!'} className={'h-[60px]!'}/>
                    </div>

                    <div>
                        <InputForm id="lastName" type="text" control={control} name={'lastName'} label="Last Name" labelClassName={'text-md!'} className={'h-[60px]!'}/>
                    </div>

                    <div className="bg-blue-500 rounded-md p-3 text-center cursor-pointer" onClick={handleSubmit(onSubmit)}>
                        <span className="font-bold text-white">Register</span>
                    </div>
                </div>
            </div>

            <Popup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
            >
                <div className="text-gray-500 flex flex-col justify-between items-center px-20 py-5 gap-4">
                    <Info  className="text-red-500" size={50}/>
                    <span className="text-[32px]">Login Failed</span>
                    <div className="flex flex-row justify-between w-[330px]">
                        <div className="bg-red-500 rounded-md p-3 text-center cursor-pointer w-[150px]" onClick={() => setIsPopupOpen(false)}>
                            <span className="font-bold text-white">Cancel</span>
                        </div>
                        <div className="bg-blue-500 rounded-md p-3 text-center cursor-pointer w-[150px]" onClick={() => setIsPopupOpen(false)}>
                            <span className="font-bold text-white">Ok</span>
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default Register