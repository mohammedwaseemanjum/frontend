import { 
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger
} from "@/components/Dropdown";
import { mergeClass } from "@/utils/tailwind";
import { Info } from "lucide-react";
import { useController, type UseControllerProps, type FieldValues } from 'react-hook-form';

interface DropdownForm <T extends FieldValues, K extends Record<string, any>> extends UseControllerProps<T> {
    handleSelect: (selected: K) => void;
    displayName: keyof K;
    dropdowns: K[],
    label: string;
}

const DropdownForm = <T extends FieldValues,K extends Record<string, any>> ({
    name,
    control,
    handleSelect,
    displayName,
    dropdowns,
    label
}: DropdownForm<T, K>) => {
    const {
        field,
        fieldState: { error },
    } = useController({ name, control });

    return (
        <div className="relative w-full">
            <Dropdown>
                <DropdownTrigger 
                    className={mergeClass(
                        field.value ? 'justify-between' : undefined,
                        !error?.message || field?.value ? undefined : "border-red-500!",
                        'h-15'
                    )}
                >
                    { field?.value }
                    <div className={mergeClass("absolute right-10", !error?.message || field?.value ? 'hidden' : 'visible')}>
                        <Info className="text-red-500"/>
                    </div>
                </DropdownTrigger>
                <DropdownMenu>
                    {dropdowns.map((dropdown, index) => (
                        <DropdownItem onSelect={() => handleSelect(dropdown)} key={index}>{ dropdown[displayName] }</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
            <span
                className={mergeClass(
                    `absolute left-4 top-5 text-gray-500 ${
                        field?.value
                        ? `top-1! origin-left -translate-y-3.5 scale-75 transform 
                        px-1 text-gray-500 duration-300 bg-white text-sm
                        peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 
                        peer-focus:-translate-y-3.5 peer-focus:scale-75 peer-focus:text-blue-600`
                        : "text-sm"
                    }`,
                    !error?.message || field?.value ? undefined : "text-red-500!" 
                )}
            >
                { label }
            </span>
            <div className="relative mt-6">
                <span className={"text-red-500 ml-1 absolute bottom-0 right-0 text-[12px]"}>{ !error?.message || field?.value ? null : error?.message }</span>
            </div>
        </div>
    )
}

export default DropdownForm