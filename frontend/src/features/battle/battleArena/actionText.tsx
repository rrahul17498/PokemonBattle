import { cn } from "@/utils/cn";



const renderActionText = (actionText: string) => (t: { visible: boolean }) => {
    return (
        <div className={cn("text-2xl text-primary text-center font-bold w-1/5 opacity-0 transition-opacity duration-500 mt-44 bg-transparent",  { "opacity-1": t.visible })}>
            <p className="whitespace-nowrap">{actionText + " !"}</p>
        </div>
    );
};

export default renderActionText;