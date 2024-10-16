import { z } from "zod";
import { AuthLayout } from "@/components/layouts/authLayout";
import Button from "@/components/ui/button";
import PokemonLogo from '@/assets/logos/pokemon.png';
import { UserSchema } from "./data/models";
import Input from "@/components/ui/form/input";
import Form from "@/components/ui/form";
import { Link } from "@/components/ui/link";


const LoginFormSchema = UserSchema.pick({ email: true, password: true });

type LoginFormValuesType = z.infer<typeof LoginFormSchema>;


export const Login = () => {

    const onSubmit = (data: LoginFormValuesType) => {

        console.log("onSubmit data: ", data);
    }

    return (
        <AuthLayout>
                <div className="px-20">
                    <img className="h-24 w-auto mx-auto mb-12" src={PokemonLogo} alt="Pokemon Battle" />
                    <Form
                    id="guest_account_name"
                    schema={LoginFormSchema}
                    defaultValues={{ email: "", password: "" }}
                    className="max-w-64 mx-auto"
                    onSubmit={onSubmit}
                    >
                        {({ register, formState }) => (
                            <>
                                <Input
                                    type="text"
                                    placeholder="Enter your name"
                                    autoComplete="off"
                                    className="text-center mx-auto"
                                    error={formState.errors["email"]}
                                    {...register("email")}
                                />
                                 <Input
                                    type="text"
                                    placeholder="Enter your name"
                                    autoComplete="off"
                                    className="text-center mx-auto"
                                    error={formState.errors["password"]}
                                    {...register("password")}
                                />
                                <div className="mt-2 mb-4">
                                    <Button
                                    type="submit"
                                    name="Go to battle"
                                    >Submit</Button>
                                </div>
                            </>
                        )}
                    
                    </Form>
                    <Link to="/" className="mt-6">Have an account ?</Link>
                </div>
        </AuthLayout>
      );

};