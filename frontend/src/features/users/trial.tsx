
import { z } from "zod";
import { AuthLayout } from "@/components/layouts/authLayout";
import Input from "@/components/ui/input";
import Form from "@/components/ui/form";
import Button from "@/components/ui/button";
import { FieldValues } from "react-hook-form";


const TrialUserFormSchema = z.object({
    name: z.string().min(3)
});

export const Trial = () => {

    const onSubmit = (data: FieldValues) => {
        console.log("name: ", data.name);
     
    }

    return (
        <AuthLayout>
            <div>
                <Form
                  id="trial_account"
                  schema={TrialUserFormSchema}
                  onSubmit={onSubmit}
                >
                    {({ register, formState }) => (
                        <>
                            <Input
                             type="text"
                             placeholder="Enter your name"
                             autoComplete={"name"}
                             {...register("name")}
                              />
                            <div className="mt-7 mb-4">
                                <Button
                                type="submit"
                                name="Go to battle"
                                disabled={!formState.isValid}
                                >Go to battle</Button>
                            </div>
                         </>
                    )}
                   
                </Form>
            </div>
        </AuthLayout>
    );

};

 