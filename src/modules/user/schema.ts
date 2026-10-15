import * as yup from 'yup';
import { createFormControl } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";

const formSchema = yup.object({
    name: yup.string().required('Name is required.'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required.'),
    role: yup.string().required('Role is required.'),
});

export type FormFields = yup.InferType<typeof formSchema>;

export const userForm = createFormControl<FormFields>({
  resolver: yupResolver(formSchema),
})