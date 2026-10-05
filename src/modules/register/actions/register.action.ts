import { useForm, type SubmitHandler, type Path } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from "@/utils/api";
import { formSchema, type FormFields } from '@modules/register/schema';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


function formatCamelCase(str: string) {
    let spaced = str?.replace(/([a-z])([A-Z])/g, '$1 $2'); 
    
    return spaced ? spaced.charAt(0).toUpperCase() + spaced.slice(1) : str;
  }


  interface BackendError {
    field?: string;
    message?: string;
  }

const useRegisterAction = () => {
    const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        setError,
    } = useForm<FormFields>({
        resolver: yupResolver(formSchema),
    });

    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)

    const onSubmit:SubmitHandler<FormFields>= (data) => {
        api.post('register', data).then(() => {
            navigate('/')
        })
        .catch((error) => {
            error?.response?.data?.errors.map((error: BackendError) => {
                if (error && error.field) {
                    const field = error.field as Path<FormFields>
                    const message = error.message?.replace(field, formatCamelCase(field))

                    setError(field, {
                        message
                    })
                }
            })
            // const errorData = error?.response?.data as BackendError;
            
            // if (errorData && errorData?.field) {
            //     const field = snakeToCamel(errorData?.field?.toString()) as Path<FormFields>
            //     const message = errorData.message?.replace(errorData?.field, formatCamelCase(snakeToCamel(errorData.field)))

            //     setError(field, {
            //         message
            //     })
            // }
        })
    };

    return {
        onSubmit,
        control,
        handleSubmit,
        isPopupOpen,
        setIsPopupOpen
    }
}

export default useRegisterAction