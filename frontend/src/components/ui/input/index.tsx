import { forwardRef } from "react";
import { cn } from "@/utils/cn";


interface Props {
   type: string,
   name: string,
   className: string,

}


const Input = forwardRef<HTMLInputElement, Props>(({ type, name, className }, ref) => {


    return (
        <input
          ref={ref}
          type={type} 
          name={name}
          className={cn("w-full rounded-md border border-border", className)}
        />
    );
});

export default Input;