import Button from "@/components/ui/button";



export const ConnectToBattle = () => {
    return (
      <main className="flex min-h-screen w-screen">
        {/* <section className="w-full flex justify-center items-center">
            <Button name="create_battle">Create Battle</Button>
        </section> */}
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
                    <Button name="create_battle">Create Battle</Button>
                </div>
             
            </div>
        </section>
      </main>
    );
  };
  