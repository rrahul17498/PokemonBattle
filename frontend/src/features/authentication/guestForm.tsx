import { z } from "zod";
import Form from "@/components/base/form";
import { OnBoardInfoType, GuestUserSchema } from "./data/models";
import Button from "@/components/base/button";
import Input from "@/components/base/form/input";
import PokemonLogo from '@/assets/logos/pokemon.png';
import { Link } from "@/components/base/link";
import AppRoutes from "@/app/routing/routes";
import useUserSession from "@/hooks/useUserSession";


interface GuestFormProps {
    onBoardInfo: OnBoardInfoType,
    updateOnBoardInfo: (data: OnBoardInfoType) => void
}

const GuestFormSchema = GuestUserSchema.pick({ name: true });

type GuestFormValuesType = z.infer<typeof GuestFormSchema>

export const GuestForm = ({ onBoardInfo, updateOnBoardInfo }: GuestFormProps) => {

    const onSubmit = (data: GuestFormValuesType) => {

        updateOnBoardInfo({
            ...onBoardInfo,
            ...data
        });
    }

    return (
            <div className="px-20">
                <img className="h-24 w-auto mx-auto mb-12" src={PokemonLogo} alt="Pokemon Battle" />
                <Form
                  id="guest_account_name"
                  schema={GuestFormSchema}
                  defaultValues={{ name: "" }}
                  className="max-w-64 mx-auto"
                  onSubmit={onSubmit}
                >
                    {({ register, formState }) => (
                        <>
                            <Input
                             type="text"
                             placeholder="Enter your name"
                             autoComplete="off"
                             error={formState.errors["name"]}
                             className="text-center"
                             {...register("name")}
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
                <Link to={AppRoutes.login}className="mt-6">Have an account ?</Link>
            </div>
    );
};
