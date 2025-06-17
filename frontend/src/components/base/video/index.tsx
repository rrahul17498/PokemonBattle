import { forwardRef } from 'react';
import { cn } from '@/utils/cn';



interface Props {
    src: string | undefined,
    autoPlay: boolean,
    hide: boolean,
    invert: boolean | undefined,
    onEnded: () => void,
}

const Video = forwardRef<HTMLVideoElement, Props>(({ src = "", autoPlay, hide, invert = false, onEnded }: Props, ref) => {
    return (
        <video
            ref={ref}
            src={src}
            className={cn(
                "w-[600px] h-[600px] m-auto",
                { "invisible": hide, "visible": !hide },
                { "scale-x-[-1]": invert, "scale-x-1": !invert },
             )}
            autoPlay={autoPlay}
            muted={true}
            onEnded={onEnded}
            controls={false}
        />
    );
});

export default Video;
