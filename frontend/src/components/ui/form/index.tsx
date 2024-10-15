import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldValues, SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { ZodType } from "zod";

type Props<TFormValues extends FieldValues,Schema extends ZodType<TFormValues>> =  {
    id: string,
    className?: string,
    schema: Schema,
    defaultValues: DefaultValues<TFormValues>,
    children: (methods: UseFormReturn<TFormValues>) => React.ReactNode,
    onSubmit: SubmitHandler<TFormValues>
}

const Form = <
TFormValues extends FieldValues,
Schema extends ZodType<TFormValues>,
>({
    id,
    className,
    schema,
    defaultValues,
    onSubmit,
    children
}: Props<TFormValues, Schema>) => {
    const form = useForm<TFormValues>({ resolver: zodResolver(schema), defaultValues, mode: "onChange" });

    console.log("formState: ", form.formState.isValid);
    return (
        <form
          id={id}
          className={className}
          onSubmit={form.handleSubmit(onSubmit)}
        >
            {children(form)}
        </form>
    );
};


export default Form;