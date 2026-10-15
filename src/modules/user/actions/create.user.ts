import { userForm, type FormFields } from "@modules/user/schema";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import type { User } from "@modules/user/queries/types";
import { type SubmitHandler, type Path } from "react-hook-form";
import { userKeys } from "@modules/user/queries/queryKeys";
import api from "@/utils/api";

export const useCreateUser = () => {
    const { 
        control,
        handleSubmit: onSubmit,
        setValue,
        setError
    } = userForm

    const queryClient = useQueryClient();

    const handleSubmit:SubmitHandler<FormFields> = (data) => {
        api.post('users/create', data).then((user: AxiosResponse<User>) => {
            const queryKey = userKeys.all;

            queryClient.setQueryData<User[]>(
                queryKey,
                (oldData) => {
                    return oldData ? [...oldData, user.data] : [user.data];
                }
            )
        }).catch((error) => {
            const serverErrors = error.response.data.errors;

            Object.keys(serverErrors).forEach((field) => {
                const fieldKey = field as Path<FormFields>;
                const messages = serverErrors[field];

                if (messages && messages.length > 0) {
                    setError(fieldKey, {
                        type: 'server',
                        message: messages[0]
                    });
                }
            });
        })
    }

    return {
        control,
        onSubmit,
        setValue,
        handleSubmit
    }
}