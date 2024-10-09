import { forwardRef } from "react";
import * as S from "./styles";


interface Props {
   type: string,
   name: string,
   className: string,

}


const Input = forwardRef<HTMLInputElement, Props>(({ type, name, className }, ref) => {


    return <S.BaseInput ref={ref}  />
});

export default Input;