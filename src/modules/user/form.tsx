import InputForm from "@/components/Input/InputForm"
import PasswordForm from '@/components/Input/PasswordForm'
import DropdownForm from "@/components/Dropdown/DropdownForm";
import { useCreateUser } from "./actions/create.user";

const Form = () => {
    const {
        control,
        onSubmit,
        setValue,
        handleSubmit
    } = useCreateUser()

    return (
        <div>
            <div>
                <InputForm type={'text'} id="name" control={control} name={'name'} label="Name" labelClassName={'text-md!'} className={'h-[60px]!'}/>
            </div>

            <div>
                <InputForm id="email" type={'text'} control={control} name={'email'} label="Email" labelClassName={'text-md!'} className={'h-[60px]!'}/>
            </div>

            <div>
                <DropdownForm 
                    displayName={'name'}
                    dropdowns={[{name: 'admin'}, {name: 'merchant'}]}
                    handleSelect={(value) => setValue('roles', value.name)}
                    name={'roles'}
                    control={control}
                    label="Role"
                />
            </div>
            <div>
                <PasswordForm id="password" type="password" control={control} name={'password'} label="Password" labelClassName={'text-md!'} className={'h-[60px]!'}/>
            </div>

            <div className="bg-blue-500 rounded-md p-3 text-center cursor-pointer" onClick={onSubmit(handleSubmit)}>
                <span className="font-bold text-white">Create</span>
            </div>
        </div>
    )
}

export default Form