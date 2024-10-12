import { forwardRef } from "react";
import { cn } from "@/utils/cn";



type VariantType = "default" | "small" | "disabled";

const getVariantStyles = (variant: VariantType) => {
    const baseStyles = "text-base shadow-md flex justify-center items-center px-4 py-2 mx-auto cursor-pointer rounded-lg";
    const variantStyles = {
            default: "bg-primary text-primary-foreground",
            small: "bg-primary text-primary-foreground py-1 px-2",
            disabled: "bg-primary-light text-disabled-foreground cursor-not-allowed"       
    };

    return cn(baseStyles, variantStyles[variant]);
    
    };

type Props =  {
   type?: "button" | "submit",
   name: string,
   className?: string,
   variant?: VariantType,
   onClick?: () => void,
   children: React.ReactNode | string,
   disabled?: boolean,
}

const Button = forwardRef<HTMLButtonElement, Props>((
    { type = "button", name, variant = "default", disabled, onClick, children }, ref
) => {

    return (
        <button
          ref={ref}
          type={type} 
          name={name}
          onClick={onClick}
          className={getVariantStyles(disabled ? "disabled" : variant)}
        >
            {children}
        </button>
    );
});

export default Button;