import { AuthLayout } from "@/components/layouts/authLayout";
import Input from "@/components/ui/input";
import Form from "@/components/ui/form";
import Button from "@/components/ui/button";
import { GuestUserNameFormSchema } from "./data/models";
import { useOnBoardGuestUser } from "./data/onBoardGuestUser";
import { z } from "zod";


export const Guest = () => {

    const { cacheUserName } =  useOnBoardGuestUser();

    const onSubmit = (data: z.infer<typeof GuestUserNameFormSchema>) => {
        cacheUserName(data);
    }

    return (
        <AuthLayout>
            <div className="">
                <Form
                  id="guest_account_name"
                  schema={GuestUserNameFormSchema}
                  defaultValues={{ name: "" }}
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

 