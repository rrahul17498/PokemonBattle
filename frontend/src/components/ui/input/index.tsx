import { forwardRef } from "react";
import { cn } from "@/utils/cn";


interface Props {
   type?: string,
   name?: string,
   className?: string,
   placeholder?: string,
   required?: boolean,
   readOnly?: boolean,
   disabled?: boolean,
   autoComplete?: string
}

const Input = forwardRef<HTMLInputElement, Props>(({
     type, name, className, placeholder, required, readOnly, disabled, autoComplete, ...restProps
     }, ref) => {

    return (
        <input
          ref={ref}
          type={type} 
          name={name}
          placeholder={placeholder}
          className={cn(
            "flex h-11 w-full rounded-md border bg-transparent px-3 py-1 mb-4 text-base shadow-sm outline-none",
             className
            )}
          readOnly={readOnly}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          {...restProps}
        />
    );
});

export default Input;