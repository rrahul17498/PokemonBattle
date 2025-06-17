import { useCallback, useEffect, useState } from "react";
import { EventAnimationBlobUrl, EventAnimationId, EventMediaAndAlignment, EventAnimationPreloadedBlobUrlAndAlignment } from "@/features/battle/data/models";
import { AnimationAlignment } from "@/types/animation";


type LoadedAnimationBlobUrlsWithAlignment = Map<EventAnimationId, EventAnimationPreloadedBlobUrlAndAlignment>;

type UseLoadAnimationsReturn = {
    isAnimationsLoaded: boolean,
    loadingProgress: number,
    loadedAnimationBlobUrlsWithAlignment: LoadedAnimationBlobUrlsWithAlignment,
    loadError: string | null,
    startLoading: () => void
};

type AnimationsToLoadInfo = Map<EventAnimationId, EventMediaAndAlignment>;

type LoadedAnimationPromiseResult = {
    id: EventAnimationId,
    blobUrl: EventAnimationBlobUrl,
    alignment: AnimationAlignment
}

export const useLoadAnimations = (attackAnimationInfoMap: AnimationsToLoadInfo): UseLoadAnimationsReturn => {
    const [isAnimationsLoaded, setIsAnimationsLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadedAnimationBlobUrlsWithAlignment, setLoadedAnimationBlobUrlsWithAlignment] = useState<LoadedAnimationBlobUrlsWithAlignment>(new Map());
    const [loadError, setLoadError] = useState<string | null>(null);

    const startLoading = useCallback(async () => {
        setLoadError(null);

        if (attackAnimationInfoMap.size === 0) {
            console.error("No animation urls found");
            return;
        }

        console.log(`Loading ${attackAnimationInfoMap.size} animations...`);

        try {
            const totalAnimations = attackAnimationInfoMap.size;
            let loadedAnimationsCount = 0;

            const loadAnimationsPromises = Array.from(attackAnimationInfoMap.entries()).map(async ([attackId, { mediaSrc: animationUrl, alignment } ]: [EventAnimationId, EventMediaAndAlignment]) => {

                try {
                    const response = await fetch(animationUrl);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch ${animationUrl}`);
                    }

                    const blob = await response.blob();
                    const blobUrl = URL.createObjectURL(blob);

                    return new Promise<LoadedAnimationPromiseResult>((resolve, reject) => {
                            const video = document.createElement("video");
                            video.preload = "auto";
                            video.muted = true;
                            video.playsInline = false;
                            
                            const videoEventsCleanUp = () => {
                                video.removeEventListener("canplaythrough", onCanPlay);
                                video.removeEventListener("error", onError);
                            };

                            const onCanPlay = () => {
                                videoEventsCleanUp();
                                
                                loadedAnimationsCount += 1;
                                setLoadingProgress((loadedAnimationsCount / totalAnimations) * 100);
                                console.log(`Animation loaded: ${animationUrl}`);
                                resolve({ id: attackId, blobUrl, alignment });
                            }

                            const onError = () => {
                                videoEventsCleanUp();
                                URL.revokeObjectURL(blobUrl);
                                reject(new Error(`Failed to load animation ${animationUrl}`))
                            }

                            video.addEventListener("canplaythrough", onCanPlay);
                            video.addEventListener("error", onError);
                            video.src = blobUrl;
                        
                    });

                } catch(e) {
                    console.error(`Failed to fetch ${animationUrl}:`, e);
                    throw new Error(`Failed to fetch ${animationUrl}`);
                }    

                

            });

            const loadAnimationsResults: LoadedAnimationPromiseResult[] = await Promise.all(loadAnimationsPromises);

           
                
            const animationUrlBlobUrlMap = new Map<EventAnimationId, EventAnimationPreloadedBlobUrlAndAlignment>();
            loadAnimationsResults.forEach(({ id: animationId, blobUrl, alignment }) => {
                if(!animationId) {
                    return;
                }
                animationUrlBlobUrlMap.set(animationId, { blobUrl, alignment });
            });

            setLoadedAnimationBlobUrlsWithAlignment(animationUrlBlobUrlMap);
            setIsAnimationsLoaded(true);

        } catch(error) {
            if(error instanceof Error) {
                setLoadError(error.message);
            } else {
                setLoadError("Unknown error");
            }
        }



    }, [attackAnimationInfoMap]);

    useEffect(() => {
        if (attackAnimationInfoMap.size > 0) {
            console.log("START_LOADING");
            startLoading();
        }
    }, [attackAnimationInfoMap, startLoading]);


    useEffect(() => {
        return () => {
            loadedAnimationBlobUrlsWithAlignment.forEach(({ blobUrl, }) => {
                URL.revokeObjectURL(blobUrl);
              });
        }
    }, [loadedAnimationBlobUrlsWithAlignment]);


    return { isAnimationsLoaded, loadingProgress, loadedAnimationBlobUrlsWithAlignment, loadError, startLoading };
};