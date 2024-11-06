import Button from "@/components/base/button";
import useConnectBattle from "./data/useConnectBattle";
import { Battle } from "./data/models";
import useUserSession from "@/hooks/useUserSession";
import Spinner from "@/components/base/spinner";



const ConnectToBattle = () => {

    const userSessionData = useUserSession();
    const { activeBattleQuery, createBattleMutation, connectBattleMutation, battlesQuery, deleteCreatedBattle } = useConnectBattle(userSessionData?.id as number);
    
    const onCreateBattle = () => {
            createBattleMutation.mutate();
    };

    const onCancelBattle = () => {
      deleteCreatedBattle();
    };

    const onJoinBattleClick = (battleId: number) => () => {
            connectBattleMutation.mutate(battleId);
    };

    return (
      <main className="flex min-h-screen w-screen">
        <section className="w-full py-16">
            <div className="shadow rounded-lg overflow-hidden h-full w-1/2 mx-auto">
                <h1 className="text-2xl font-semibold text-center py-4 bg-teal-500">Create / Join Battle</h1>
                <div className="min-h-48">
                    {battlesQuery.isLoading
                     ? (
                        <div className="h-48"><Spinner message="Loading Battles..." /></div>
                     ) : (
                        battlesQuery.data.map((battleData: Battle, i: number) => {
                            const isBattleCreatedByUser = activeBattleQuery.data?.battle_id == battleData.battle_id;
                            
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
                    {activeBattleQuery.data
                     ? <Button name="cancel_battle" onClick={onCancelBattle}>Cancel Battle</Button>
                     : <Button name="create_battle" onClick={onCreateBattle}>Create Battle</Button>
                    }
                </div>
             
            </div>
        </section>
      </main>
    );
  };

export default ConnectToBattle;   

  