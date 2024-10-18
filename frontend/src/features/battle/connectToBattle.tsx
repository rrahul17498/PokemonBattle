import AppRoutes from "@/app/routing/routes";
import Button from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useBattle from "./data/useConnectBattle";
import useUser from "@/hooks/useUser";



const ConnectToBattle = () => {

    const { createBattleMutation, battlesQuery } = useBattle();
    const { getUserQuery } = useUser();
    
    const onCreateBattle = () => {
        const { data } = getUserQuery;

        if (data.id) {
            createBattleMutation.mutate({ user_id: data.id });
        }
    };


    console.log("battlesQuery data:", battlesQuery.data);

    return (
      <main className="flex min-h-screen w-screen">
        <section className="w-full py-16">
            <div className="shadow rounded-lg overflow-hidden h-full w-1/2 mx-auto">
                <h1 className="text-2xl font-bold text-center py-4 bg-teal-500">Battles</h1>
                <div>
                    <article className="border-border/60 border-b h-fit p-4 flex items-center justify-between">
                        <p className="text-lg">Rohit's game</p>
                        <div>
                        <Button name="join_battle" variant="small">Join</Button>
                        </div>      
                    </article>
                    <article className="border-border/60 border-b h-fit p-4 flex items-center justify-between">
                        <p className="text-lg">Rohit's game</p>
                        <div>
                        <Button name="join_battle" variant="small">Join</Button>
                        </div>      
                    </article>
                </div>
                <div className="py-10">
                    <Button name="create_battle" onClick={onCreateBattle}>Create Battle</Button>
                </div>
             
            </div>
        </section>
      </main>
    );
  };

export default ConnectToBattle;   

  