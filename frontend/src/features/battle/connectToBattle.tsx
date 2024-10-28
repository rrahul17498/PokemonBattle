import Button from "@/components/ui/button";
import useConnectBattle from "./data/useConnectBattle";
import { Battle } from "./data/models";
import useUserSession from "@/hooks/useUserSession";



const ConnectToBattle = () => {

    const { createBattleMutation, connectBattleMutation, battlesQuery } = useConnectBattle();
    
    const userSessionData = useUserSession();
    
    const onCreateBattle = () => {
        if (userSessionData?.id) {
            createBattleMutation.mutate({ user_id: userSessionData.id });
        }
    };

    const onJoinBattleClick = (battleId: number) => () => {
        if (userSessionData?.id && battleId) {
            connectBattleMutation.mutate({ user_id: userSessionData.id, battle_id: battleId });
        }
    };

    return (
      <main className="flex min-h-screen w-screen">
        <section className="w-full py-16">
            <div className="shadow rounded-lg overflow-hidden h-full w-1/2 mx-auto">
                <h1 className="text-2xl font-semibold text-center py-4 bg-teal-500">Create / Join Battle</h1>
                <div>
                    {battlesQuery.isLoading
                     ? (
                        <div>Loading</div>
                     ) : (
                        battlesQuery.data.map((battleData: Battle, i: number) => {

                            const userId = userData?.id;
                            const isBattleCreatedByUser = userId && userId == battleData.first_player_id;
                            
                            return (
                            <article key={`battle_${i}`} className="border-border/60 border-b h-fit p-4 flex items-center justify-between">
                                <p className="text-lg">{battleData.first_player_name}'s Battle</p>
                                <div>
                                    {isBattleCreatedByUser
                                     ? <p className="text-subtleStatus">Waiting for second player</p>
                                     : <Button
                                        onClick={onJoinBattleClick(battleData.battle_id)}
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

  