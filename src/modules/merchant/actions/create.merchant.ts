import { type SubmitHandler } from "react-hook-form";
import { merchantForm, type FormFields } from "@modules/merchant/schema";
import api from "@/utils/api";
import { useShallow } from 'zustand/react/shallow';
import { useUserStore } from "@/stores/user";

const useCreateAction = () => {
    const { setMerchant } = useUserStore(
        useShallow((state) => ({
            setMerchant: state.setMerchant,
        }))
    )

    const {
        control,
        handleSubmit: 
        onSubmit,
    } = merchantForm

    const handleSubmit:SubmitHandler<FormFields> = (data) => {
        const formData = new FormData();

        formData.append('name', JSON.stringify(data.metaData.store_name));
        formData.append('meta_data', JSON.stringify(data.metaData));
        formData.append("profile_photo", data.profilePhoto[0]);
        formData.append("cover_photo", data.coverPhoto[0]);
        
        api.post('merchants/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            }
        }).then((response) => {
           setMerchant(response.data)
        })
    }

    return {
        handleSubmit,
        onSubmit,
        control,
    }
}

export default useCreateAction