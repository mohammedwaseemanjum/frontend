import { mergeClass } from "@/utils/tailwind";
import Input from "@component/Input";
import { useController, type UseControllerProps, type FieldValues } from 'react-hook-form';
import { Info, Eye, EyeOff } from 'lucide-react';
import { useState } from "react";

interface FormInputI <T extends FieldValues> extends UseControllerProps<T> {
    placeholder?: string;
    id: string;
    label: string;
    type: string;
    className?: string;
    labelClassName?: string;
}

const PasswordForm = <T extends FieldValues> ({
    name,
    control,
    id, 
    label, 
    className, 
    labelClassName 
}: FormInputI<T>) => {
    const {
        field,
        fieldState: { error },
    } = useController({ name, control });

    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <>
            <div className="relative flex flex-row items-center">
                <Input
                    {...field}
                    id={id} 
                    label={label} 
                    type={ showPassword ? 'text' : 'password'}
                    className={error ? `border-red-500! ${className}` : className} 
                    labelClassName={error ? `text-red-500! ${labelClassName}` : labelClassName}
                    value={field.value ?? ''}
                />

                <div className={mergeClass("absolute right-3", error?.message ? 'visible' : 'hidden')}>
                    <Info className="text-red-500"/>
                </div>

                <div onClick={() => setShowPassword(!showPassword)} className={mergeClass("absolute right-3", error?.message ? 'hidden' : 'visible')}>
                    { showPassword ? <Eye /> : <EyeOff />}
                </div>
            </div>
            <div className="relative mt-6">
                <span className={mergeClass("text-red-500 ml-1 absolute bottom-0 right-0 text-[12px]")}>{ error?.message }</span>
            </div>
        </>
    )
}

export default PasswordForm