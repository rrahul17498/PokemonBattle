import { ReactNode } from "react";


type FieldWrapperProps = {
  children: ReactNode,
  errorMessage: string | undefined
}


export const FieldWrapper = ({ children, errorMessage }: FieldWrapperProps) => {

    return (
        <div className="mb-1">
            {children}
            <p className="text-red-500 text-xs mt-1 px-3 h-4">{errorMessage}</p>
        </div>
    );

};