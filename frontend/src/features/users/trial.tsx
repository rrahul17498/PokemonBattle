
import { z } from "zod";
import { AuthLayout } from "@/components/layouts/authLayout";
import Input from "@/components/ui/input";
import Form from "@/components/ui/form";
import Button from "@/components/ui/button";


const TrialUserSchema = z.object({
    name: z.string().min(3, 'Required')
});

export const Trial = () => {

    return (
        <AuthLayout>
            <div>
                <Form
                  id="trial_account"
                  schema={TrialUserSchema}
                  onSubmit={() => {
                    console.log("Submitted !");
                  }}
                >
                    {({ register }) => (
                        <>
                            <Input type="text" placeholder="Enter your name" {...register("name")} />
                            <div className="mt-7 mb-4">
                                <Button
                                type="submit"
                                name="Battle"
                                disabled={true}
                                >Go to battle</Button>
                            </div>
                         </>
                    )}
                   
                </Form>
            </div>
        </AuthLayout>
    );

};

 