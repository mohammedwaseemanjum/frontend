import { mergeClass } from "@/utils/tailwind";
import type { InputHTMLAttributes } from "react";
import { style, labelStyle } from '@/components/Input/style'

export interface TextI extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    type: string;
    className?: string;
    labelClassName?: string;
}

const Input:React.FC<TextI> = ({ id, label, type, className, labelClassName, ...rest }) => {
    return (
      <div className="relative w-full">
        <input
          {...rest}
          type={type}
          id={id}
          placeholder=" "
          className={mergeClass(className, style)}
        />
        <label
          htmlFor={id}
          className={mergeClass(labelClassName, labelStyle)}
        >
          { label }
        </label>
      </div>
    )
  }

  export default Input