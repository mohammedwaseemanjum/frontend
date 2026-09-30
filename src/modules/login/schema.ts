import * as yup from 'yup';

export const formSchema = yup.object({
    password: yup
    .string()
    .required('Password is required')
    .min(3, 'Password must be at least 3 characters'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
});

export type FormFields = yup.InferType<typeof formSchema>;