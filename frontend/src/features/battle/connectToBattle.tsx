import Button from "@/components/ui/button";
import useBattle from "./data/useConnectBattle";
import useUser from "@/hooks/useUser";
import { Battle } from "./data/models";



const ConnectToBattle = () => {

    const { createBattleMutation, battlesQuery } = useBattle();
    const { userQuery: { data: userData } } = useUser();
    
    const onCreateBattle = () => {
        if (userData.id) {
            createBattleMutation.mutate({ user_id: userData.id });
        }
    };

    const onJoinBattleClick = (battleId: number) => () => {

        console.log("Go to battle: ", battleId);

    };


    console.log("battlesQuery data:", battlesQuery.data);

    return (
      <main className="flex min-h-screen w-screen">
        <section className="w-full py-16">
            <div className="shadow rounded-lg overflow-hidden h-full w-1/2 mx-auto">
                <h1 className="text-2xl font-bold text-center py-4 bg-teal-500">Create / Join Battle</h1>
                <div>
                    {battlesQuery.isLoading
                     ? (
                        <div>Loading</div>
                     ) : (
                        battlesQuery.data.map((battleData: Battle) => {

                            const userId = userData?.id;

                            const isBattleCreatedByUser = userId && userId == battleData.first_player_id;

                            console.log("userId: ", userId);
                            console.log("first_player_id: ", battleData.first_player_id);

                            
                            return (
                            <article className="border-border/60 border-b h-fit p-4 flex items-center justify-between">
                                <p className="text-lg">{battleData.first_player_name}'s Battle</p>
                                <div>
                                    {isBattleCreatedByUser
                                     ? <p className="text-subtleStatus">Waiting for second player</p>
                                     : <Button
                                        onClick={onJoinBattleClick(battleData.id)}
                                        name="join_battle"
                                        variant="small"
                                        disabled={isBattleCreatedByUser}
                                        >Join</Button>}
                                </div>      
                           </article>
                        );
                    })

                     )}
                    
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

  