import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { Schema, z } from "zod";

type Props =  {
    id: string,
    className?: string,
    schema: Schema
    children: (methods: UseFormReturn) => React.ReactNode,
    onSubmit: () => void
}

const Form = ({
    id,
    className,
    schema,
    onSubmit,
    children
}: Props) => {
    const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema)});
    return (
        <form
          id={id}
          className={className}
          onSubmit={onSubmit}
        >
            {children(form)}
        </form>
    );
};


export default Form;