import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { ButtonVariantType } from "./types";


const getVariantStyles = (className: string, variant: ButtonVariantType, disabled: boolean) => {
    const baseStyles = "text-base shadow-md flex justify-center items-center mx-auto cursor-pointer rounded-lg";
    const variantStyles = {
            [ButtonVariantType.DEFAULT]: { base: "px-4 py-2", active: "bg-primary text-primary-foreground", inactive: "bg-primary-light text-disabled-foreground cursor-not-allowed" },
            [ButtonVariantType.SMALL]: { base: "py-1 px-2", active: "bg-primary text-primary-foreground py-1 px-2", inactive: "bg-primary-light text-disabled-foreground cursor-not-allowed" },
            [ButtonVariantType.CONTAINER]: { base: "block p-0 w-fit shadow-none overflow-hidden bg-none", active: "opacity-100", inactive: "opacity-50 cursor-not-allowed" },       
    };

    return cn(baseStyles, variantStyles[variant].base, (disabled ? variantStyles[variant].inactive : variantStyles[variant].active), className);
    
    };

type Props =  {
   type?: "button" | "submit",
   name: string,
   className?: string,
   variant?: ButtonVariantType,
   onClick?: () => void,
   children: React.ReactNode | string,
   disabled?: boolean,
}

const Button = forwardRef<HTMLButtonElement, Props>((
    { type = "button", name, variant = ButtonVariantType.DEFAULT, className = "", disabled = false, onClick, children }, ref
) => {

    return (
        <button
          ref={ref}
          type={type} 
          name={name}
          onClick={onClick}
          className={getVariantStyles(className, variant, disabled)}
        >
            {children}
        </button>
    );
});

export default Button;