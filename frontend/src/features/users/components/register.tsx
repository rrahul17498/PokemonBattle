import { AuthLayout } from "@/components/layout/authLayout";
import Input from "@/components/ui/input";
import Form from "@/components/ui/form";
import Button from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import AppRoutes from "@/app/routing/routes";

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
                    <Input type="email" name="Email" placeholder="Enter your name" />
                    <Input type="password" name="Password" placeholder="Enter your password" />
                    <Button
                     type="submit"
                     name={""}
                     className="mt-7 mb-4"
                     >
                        Register
                     </Button>
                </Form>
                <Link to={AppRoutes.login} >Log In ?</Link>
            </div>
        </AuthLayout>
    );

};

 