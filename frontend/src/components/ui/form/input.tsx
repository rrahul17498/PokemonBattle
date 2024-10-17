import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { FieldError } from "react-hook-form";
import { FieldWrapper } from "./fieldWrapper";


interface Props {
   type?: string,
   name?: string,
   className?: string,
   placeholder?: string,
   required?: boolean,
   readOnly?: boolean,
   disabled?: boolean,
   autoComplete?: string,
   error?: FieldError
}

const Input = forwardRef<HTMLInputElement, Props>(({
     type, name, className, placeholder, required, readOnly, disabled, autoComplete, error, ...restProps
     }, ref) => {

    return (
        <FieldWrapper errorMessage={error?.message}>
          <input
            ref={ref}
            type={type} 
            name={name}
            placeholder={placeholder}
            className={cn(
              "flex h-11 w-full rounded-md border bg-transparent text-base px-3 py-0 mx-auto shadow-sm outline-none",
              className
              )}
            readOnly={readOnly}
            required={required}
            disabled={disabled}
            autoComplete={autoComplete}
            {...restProps}
          />
        </FieldWrapper>
    );
});

export default Input;