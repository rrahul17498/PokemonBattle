import Video from "@/components/base/video";
import { useState, useRef, useEffect } from "react";
import { EventAnimation, FormattedBattleResources, PokemonActionTypes } from "../data/models";

interface AttackAnimationPanelProps {
  eventAnimationsList: EventAnimation[],
  formattedBattleResources: FormattedBattleResources,
  updateEventAnimationsList: (eventAnimationList: EventAnimation[]) => void,
  displayPokemonResultAndUpdateBattleState: () => void
}

const AttackAnimationPanel = ({ eventAnimationsList, updateEventAnimationsList, displayPokemonResultAndUpdateBattleState }: AttackAnimationPanelProps) => {

    const [currentAttackAnimation, setCurrentAttackAnimation] = useState<EventAnimation & { isLast: boolean } | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
      if (!currentAttackAnimation && eventAnimationsList.length > 0) {
           console.log("currAnimationUpdate");
          const [upcomingEventAnimation, ...remainingEventAnimation] = eventAnimationsList;
          if (upcomingEventAnimation.actionType === PokemonActionTypes.ATTACK) {
            setCurrentAttackAnimation({ ...upcomingEventAnimation, isLast: !remainingEventAnimation.length });
            updateEventAnimationsList(remainingEventAnimation);
          }
      } 
    },[currentAttackAnimation, eventAnimationsList, updateEventAnimationsList]);
  
    useEffect(() => {
        if (videoRef.current && currentAttackAnimation) {
            videoRef.current.load();
            videoRef.current.play();
        } 
      },[currentAttackAnimation]);



    const onCurrentAttackAnimationEnd = () => {
      console.log("onCurrentAttackAnimationEnd");
        if (currentAttackAnimation?.isLast) {
            displayPokemonResultAndUpdateBattleState();
        }

        setCurrentAttackAnimation(null);
    };

    console.log("currentAttackAnimation: ", currentAttackAnimation);

    return (
        <section className="border-border border-x flex justify-around p-6 rounded bg-black">
             <Video
                ref={videoRef}
                src={currentAttackAnimation?.mediaSrc || ""}
                autoPlay={false}
                hide={false}
                onEnded={onCurrentAttackAnimationEnd}
                />
        </section>
    );
};

export default AttackAnimationPanel;