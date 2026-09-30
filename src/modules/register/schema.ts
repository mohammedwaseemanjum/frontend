import * as yup from 'yup';

export const formSchema = yup.object({
    confirmPassword:yup
        .string()
        .required('Password is required')
        .oneOf([yup.ref('password')], 'Passwords must match'),
    password: yup
        .string()
        .required('Password is required'),
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    lastName: yup.string().required('Last Name is required'),
    firstName: yup.string().required('First Name is required')
});

export type FormFields = yup.InferType<typeof formSchema>;