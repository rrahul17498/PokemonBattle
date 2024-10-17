import { forwardRef } from "react";
import { cn } from "@/utils/cn";

enum VariantType {
    DEFAULT = "default",
    SMALL = "small",
    DISABLED = "disabled",
    CONTAINER = "container",
};


const getVariantStyles = (className: string, variant: VariantType) => {
    const baseStyles = "text-base shadow-md flex justify-center items-center px-4 py-2 mx-auto cursor-pointer rounded-lg";
    const variantStyles = {
            [VariantType.DEFAULT]: "bg-primary text-primary-foreground",
            [VariantType.SMALL]: "bg-primary text-primary-foreground py-1 px-2",
            [VariantType.DISABLED]: "bg-primary-light text-disabled-foreground cursor-not-allowed",
            [VariantType.CONTAINER]: "shadow-none overflow-hidden",       
    };

    return cn(baseStyles, variantStyles[variant], className);
    
    };

type Props =  {
   type?: "button" | "submit",
   name: string,
   className?: string,
   variant?: string,
   onClick?: () => void,
   children: React.ReactNode | string,
   disabled?: boolean,
}

const Button = forwardRef<HTMLButtonElement, Props>((
    { type = "button", name, variant = VariantType.DEFAULT, className = "", disabled, onClick, children }, ref
) => {

    return (
        <button
          ref={ref}
          type={type} 
          name={name}
          onClick={onClick}
          className={getVariantStyles(className, disabled ? VariantType.DISABLED : variant as VariantType)}
        >
            {children}
        </button>
    );
});

export default Button;