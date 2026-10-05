import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from "@/utils/api";
import type { AxiosResponse } from "axios";
import { formSchema, type FormFields } from '../schema';
import type { LoginI } from '../types';
import { useAuth } from '@contexts/auth.context';
import { useNavigate } from "react-router-dom";
import { useShallow } from 'zustand/react/shallow';
import { useUserStore } from "@/stores/user";
import { useState } from 'react';

const useLoginAction = () => {
    const navigate = useNavigate()
    const { login } = useAuth();

    const { setUser, user } = useUserStore(
        useShallow((state) => ({
          user: state.user,
          setUser: state.setUser,
        }))
    )

    const {
        handleSubmit,
        control
    } = useForm<FormFields>({
        resolver: yupResolver(formSchema),
    });
    
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)

    const onSubmit:SubmitHandler<FormFields>= (data) => {
        api.post('login', data).then((res: AxiosResponse<LoginI>) => {
            if (res.data.merchant) {
                setUser(res.data)
            }
            login()
            navigate('/')
        })
        .catch(() => {
            setIsPopupOpen(true)
        })
    };

    return {
        onSubmit,
        control,
        handleSubmit,
        user,
        isPopupOpen,
        setIsPopupOpen
    }
}

export default useLoginAction