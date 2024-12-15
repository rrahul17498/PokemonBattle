import Video from "@/components/base/video";
import { isNull } from "lodash";
import { useState, useRef, useEffect } from "react";



const AttackAnimationPanel = () => {
    const [attackAnimationSrc, setAttackAnimationSrc] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const onAttackAnimationEnd = () => {
        setAttackAnimationSrc(null);
      };
  
    useEffect(() => {
        if (!isNull(attackAnimationSrc) && videoRef.current) {
            videoRef.current.load();
            videoRef.current.play();
        } 
      },[attackAnimationSrc]);

    return (
        <section className="border-border border-x flex justify-around p-6 rounded bg-black">
             <Video
                ref={videoRef}
                src={!isNull(attackAnimationSrc) ? attackAnimationSrc : ""}
                autoPlay={false}
                hide={false}
                onEnded={onAttackAnimationEnd}
                />
        </section>
    );
};

export default AttackAnimationPanel;