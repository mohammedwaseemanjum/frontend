import { mergeClass } from '@/utils/tailwind';
import { useController, type UseControllerProps, type FieldValues } from 'react-hook-form';
import { Info } from 'lucide-react';

interface FileUploadForm <T extends FieldValues> extends UseControllerProps<T> {
    label: string;
    id: string;
    className?: string;
}

const style = `w-full rounded-lg border-2 
border-gray-200 bg-transparent px-4 
py-2 text-sm text-gray-900 flex items-center`

const FileUploadForm = <T extends FieldValues> ({ label, className, name, control, id }: FileUploadForm<T>) => {
    const {
        field: { onChange, value },
        fieldState: { error },
    } = useController({ name, control });

    return (
        <div className="relative">
            <div className={mergeClass(className, style, error ? 'border-red-500!' : null)}>
                <label
                    htmlFor={id}
                    className={mergeClass(
                        `absolute left-4 top-5 text-gray-500 ${
                            value?.[0]?.name
                            ? `top-1! origin-left -translate-y-3.5 scale-75 transform 
                            px-1 text-gray-500 duration-300 bg-white text-sm
                            peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 
                            peer-focus:-translate-y-3.5 peer-focus:scale-75 peer-focus:text-blue-600`
                            : "text-sm"
                        }`,
                        !error?.message || value?.[0]?.name ? undefined : "text-red-500!" 
                    )}
                >
                    { label }
                </label>
                
                <div className={mergeClass("absolute right-3", error?.message ? 'visible' : 'hidden')}>
                    <Info className="text-red-500"/>
                </div>

                <input type={'file'} id={id} onChange={(e) => onChange(e.target.files)} className='hidden'/>

                <span>
                    { value?.[0]?.name }
                </span>
            </div>
            
            <div className="relative mt-6">
                <span className={"text-red-500 ml-1 absolute bottom-0 right-0 text-[12px]"}>{ !error?.message || value?.[0]?.name ? null : error?.message }</span>
            </div>
        </div>
    )
}

export default FileUploadForm