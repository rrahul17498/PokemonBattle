import { AuthLayout } from "@/components/layout/authLayout";
import Button from "@/components/ui/button";
import Form from "@/components/ui/form";
import Input from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import AppRoutes from "@/app/routing/routes";


export const Login = () => {
    return (
        <AuthLayout title={"Log in to your account"}>
               <div>
                <Form
                  id="login_account"
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
                        Login
                     </Button>
                </Form>
                <Link to={AppRoutes.register} >Register ?</Link>
            </div>
        </AuthLayout>
    );
};

 