import { forwardRef } from "react";
import { cn } from "@/utils/cn";



type VariantType = "default" | "disabled";

const getVariantStyles = (variant: VariantType) => {
    const baseStyles = "text-base shadow-md flex justify-center items-center px-4 py-2 mx-auto cursor-pointer rounded-lg";
    const variantStyles = {
            default: "bg-primary text-primary-foreground",
            disabled: "bg-primary-light text-disabled-foreground cursor-not-allowed"       
    };

    return cn(baseStyles, variantStyles[variant]);
    
    };

type Props =  {
   type: "button" | "submit",
   name: string,
   className?: string,
   variant?: VariantType,
   children: React.ReactNode | string,
   disabled: boolean,
}

const Button = forwardRef<HTMLButtonElement, Props>((
    { type, name, variant = "default", disabled, className, children }, ref
) => {

    return (
        <button
          ref={ref}
          type={type} 
          name={name}
          className={getVariantStyles(disabled ? "disabled" : variant)}
        >
            {children}
        </button>
    );
});

export default Button;