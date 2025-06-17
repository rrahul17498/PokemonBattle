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

export const useLoadAnimations = (attackAnimationInfoList: AnimationsToLoadInfo): UseLoadAnimationsReturn => {
    const [isAnimationsLoaded, setIsAnimationsLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadedAnimationBlobUrlsWithAlignment, setLoadedAnimationBlobUrlsWithAlignment] = useState<LoadedAnimationBlobUrlsWithAlignment>(new Map());
    const [loadError, setLoadError] = useState<string | null>(null);

    const startLoading = useCallback(async () => {
        setLoadError(null);

        if (attackAnimationInfoList.size === 0) {
            console.error("No animation urls found");
            return;
        }

        console.log(`Loading ${attackAnimationInfoList.size} animations...`);

        try {
            const totalAnimations = attackAnimationInfoList.size;
            let loadedAnimationsCount = 0;

            const loadAnimationsPromises = attackAnimationInfoList.entries().map(async ([attackId, { mediaSrc: animationUrl, alignment } ]) => {

                try {
                    const response = await fetch(animationUrl);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch ${animationUrl}`);
                    }

                    const blob = await response.blob();
                    const blobUrl = URL.createObjectURL(blob);

                    return new Promise<{ id: EventAnimationId, blobUrl: EventAnimationBlobUrl, alignment: AnimationAlignment }>((resolve, reject) => {
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

                            const onError = (e) => {
                                videoEventsCleanUp();
                                URL.revokeObjectURL(blobUrl);
                                reject(new Error(`Failed to load animation: ${animationUrl}`))
                            }

                            video.addEventListener("canplaythrough", onCanPlay);
                            video.addEventListener("error", onError);
                            video.src = blobUrl;
                        
                    });

                } catch(e) {
                    console.error(`Failed to fetch animation: ${animationUrl}`);
                    throw new Error(`Failed to fetch ${animationUrl}`);
                }    

                

            });

            const loadAnimationsResults = await Promise.all(loadAnimationsPromises);

           
                
            const animationUrlBlobUrlMap = new Map<EventAnimationId, EventAnimationPreloadedBlobUrlAndAlignment>();
            loadAnimationsResults.forEach(({ id: animationId, blobUrl, alignment}) => {
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



    }, [attackAnimationInfoList]);

    useEffect(() => {
        if (attackAnimationInfoList.size > 0) {
            console.log("START_LOADING");
            startLoading();
        }
    }, [attackAnimationInfoList, startLoading]);


    useEffect(() => {
        return () => {
            loadedAnimationBlobUrlsWithAlignment.forEach(({ blobUrl, }) => {
                URL.revokeObjectURL(blobUrl);
              });
        }
    }, [loadedAnimationBlobUrlsWithAlignment]);


    return { isAnimationsLoaded, loadingProgress, loadedAnimationBlobUrlsWithAlignment, loadError, startLoading };
};