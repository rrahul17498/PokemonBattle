import { z } from "zod";
import Form from "@/components/ui/form";
import { OnBoardInfoType, GuestUserSchema } from "./data/models";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import PokemonLogo from '@/assets/logos/pokemon.png';


interface GuestFormProps {
    onBoardInfo: OnBoardInfoType,
    updateOnBoardInfo: (data: OnBoardInfoType) => void
}

const GuestFormSchema = GuestUserSchema.pick({ name: true });

type GuestFormValuesType = z.infer<typeof GuestFormSchema>

export const GuestForm = ({ onBoardInfo, updateOnBoardInfo }: GuestFormProps) => {

    const onSubmit = (data: GuestFormValuesType) => {

        console.log("onSubmit data: ", data);

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
                  onSubmit={onSubmit}
                >
                    {({ register, formState }) => (
                        <>
                            <Input
                             type="text"
                             placeholder="Enter your name"
                             autoComplete={"name"}
                             className="text-center max-w-64 mx-auto"
                             {...register("name")}
                              />
                            <div className="mt-7 mb-4">
                                <Button
                                type="submit"
                                name="Go to battle"
                                disabled={!formState.isValid}
                                >Submit</Button>
                            </div>
                         </>
                    )}
                   
                </Form>
            </div>
    );
};
