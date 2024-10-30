import { forwardRef } from 'react';
import * as S from './styles';

interface Props {
    src: string,
    autoPlay: boolean,
    hide: boolean,
    onEnded: () => void,
}

const Video = forwardRef<HTMLVideoElement, Props>(({ src, autoPlay, hide, onEnded }: Props, ref) => {
    return (
      <S.BaseVideo
       ref={ref}
       src={src}
       $hide={hide}
       autoPlay={autoPlay}
       muted={true}
       onEnded={onEnded}
       controls={false}
        />
    );
});

export default Video;
