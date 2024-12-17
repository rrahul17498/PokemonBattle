import Video from "@/components/base/video";
import { useState, useRef, useEffect } from "react";
import { AttackAnimation, EventAnimation, FormattedBattleResources, PokemonActionTypes } from "../data/models";

interface AttackAnimationPanelProps {
  eventAnimationsList: EventAnimation[],
  formattedBattleResources: FormattedBattleResources,
  updateEventAnimationsList: (eventAnimationList: EventAnimation[]) => void
}

const AttackAnimationPanel = ({ formattedBattleResources, eventAnimationsList, updateEventAnimationsList }: AttackAnimationPanelProps) => {

    const [currentAttackAnimation, setCurrentAttackAnimation] = useState<AttackAnimation | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
      if (!currentAttackAnimation && eventAnimationsList.length > 0) {
          const [upcomingEventAnimation, ...remainingEventAnimation] = eventAnimationsList;
          if (upcomingEventAnimation.actionType === PokemonActionTypes.ATTACK) {
            setCurrentAttackAnimation(upcomingEventAnimation);
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
        setCurrentAttackAnimation(null);
      };

    return (
        <section className="border-border border-x flex justify-around p-6 rounded bg-black">
             <Video
                ref={videoRef}
                src={currentAttackAnimation ? currentAttackAnimation.mediaSrc : ""}
                autoPlay={false}
                hide={false}
                onEnded={onCurrentAttackAnimationEnd}
                />
        </section>
    );
};

export default AttackAnimationPanel;