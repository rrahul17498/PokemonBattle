import { forwardRef } from "react";
import { cn } from "@/utils/cn";


const buttonVariant = {
     default: "bg-primary text-xl text-primary-foreground flex justify-center items-center cursor-pointer rounded-lg mx-auto min-w-36"
};

const buttonSize = {
    default: "px-4 py-2"
};



interface Props {
   type: "button" | "submit" | "reset",
   name: string,
   className?: string,
   variant?: keyof typeof buttonVariant,
   size?: keyof typeof buttonSize,
   children: React.ReactNode | string
}

const Button = forwardRef<HTMLButtonElement, Props>(({ type, name, className, variant = "default", size = "default", children }, ref) => {

    return (
        <button
          ref={ref}
          type={type} 
          name={name}
          className={cn(buttonVariant[variant], buttonSize[size], className)}
        >
            {children}
        </button>
    );
});

export default Button;