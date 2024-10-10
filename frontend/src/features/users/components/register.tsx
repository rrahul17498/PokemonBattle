import { AuthLayout } from "@/components/layout/authLayout";
import Input from "@/components/ui/input";
import Form from "@/components/ui/form";
import Button from "@/components/ui/button";


export const Register = () => {

    return (
        <AuthLayout title={"Register your account"}>
            <div>
                <Form
                  id="register_account"
                  onSubmit={() => {
                    console.log("Submitted !");
                  }}
                >
                    <Input type="text" name="Email" placeholder="Enter your name" />
                    <Input type="password" name="Password" placeholder="Enter your password" />
                    <Button
                     type="submit"
                     name={""}
                     className="mt-6"
                     >
                        Register
                     </Button>
                </Form>
            </div>
        </AuthLayout>
    );

};

 