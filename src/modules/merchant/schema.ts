import * as yup from 'yup';
import { createFormControl } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";

const formSchema = yup.object({
    profilePhoto:yup.mixed<FileList>().required('Profile Photo is required').test('file', "Please select a file", (value) => {
        if (!value[0].size) {
          return true;
        }

        return value[0] instanceof File
    }),
    coverPhoto:yup.mixed<FileList>().required('Cover Photo is required').test('file', "Please select a file", (value) => {
        if (!value[0].size) {
          return true;
        }

        return value[0] instanceof File
    }),
    metaData: yup.object({
        store_name: yup.string().required('Store name is required.'),
        address_one:yup.string(),
        address_two: yup.string(),
        region: yup.string().required('Region is required.'),
        province: yup.string().required('Province is required.'),
        city: yup.string().required('City is required.'),
        barangay: yup.string().required('Barangay is required.'),
        zip: yup.number().typeError('Zip Code must be a number')
          .positive('Must be a positive number')
          .integer('Must be a whole number')
          .required('ZipCode is required'),
        store_phone: yup.string().required('Store Phone is required.'),
    })
});

export type FormFields = yup.InferType<typeof formSchema>;

export const merchantForm = createFormControl<FormFields>({
  resolver: yupResolver(formSchema),
})