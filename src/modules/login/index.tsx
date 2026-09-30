import InputForm from "@/components/Input/InputForm"
import PasswordForm from '@/components/Input/PasswordForm'
import { useEffect } from "react";
import { Popup } from "@/components/Popup";
import { useUserStore } from "@/stores/user";
import useLoginAction from "./actions/login.action";
import { Info } from 'lucide-react';
import { NavLink } from "react-router-dom";

const Login = () => {
    const {
        user,
        control,
        handleSubmit,
        onSubmit,
        isPopupOpen,
        setIsPopupOpen,
    } = useLoginAction()

    useEffect(() => {
        if (user) {
            useUserStore.persist.clearStorage()
        }
    }, [])

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="bg-white shadow-md w-[500px] px-4 py-20 rounded-md border border-gray-200 flex flex-col items-center">
                <div className="w-[400px] flex flex-col gap-2">
                    <div>
                        <InputForm id="email" type="email" control={control} name={'email'} label="Email" labelClassName={'text-md!'} className={'h-[60px]!'}/>
                    </div>

                    <div>
                        <PasswordForm id="password" type="password" control={control} name={'password'} label="Password" labelClassName={'text-md!'} className={'h-[60px]!'}/>
                    </div>

                    <div className="bg-blue-500 rounded-md p-3 text-center cursor-pointer" onClick={handleSubmit(onSubmit)}>
                        <span className="font-bold text-white">Login</span>
                    </div>

                    <div className="mt-2 text-center">
                        <span className="text-gray-500">New on our platform?</span> <NavLink className="font-bold text-blue-500" to={'register'}>Create an account</NavLink>
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

export default Login