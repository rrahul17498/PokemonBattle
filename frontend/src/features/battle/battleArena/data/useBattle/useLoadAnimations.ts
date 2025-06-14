import { useCallback, useEffect, useState } from "react";
import { EventAnimationBlobUrl, EventAnimationId, EventAnimationUrl, PreloadedAnimationInfo } from "@/features/battle/data/models";


type UseLoadAnimationsReturn = {
    isAnimationsLoaded: boolean,
    loadingProgress: number,
    loadedAnimationBlobUrls: PreloadedAnimationInfo,
    loadError: string | null,
    startLoading: () => void
};

type AnimationToLoadInfo = Map<EventAnimationId, EventAnimationUrl>;

export const useLoadAnimations = (attackAnimationInfoList: AnimationToLoadInfo): UseLoadAnimationsReturn => {
    const [isAnimationsLoaded, setIsAnimationsLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadedAnimationBlobUrls, setLoadedAnimationBlobUrls] = useState<PreloadedAnimationInfo>(new Map());
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

            const loadAnimationsPromises = attackAnimationInfoList.entries().map(async ([attackId, animationUrl ]) => {

                try {
                    const response = await fetch(animationUrl);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch ${animationUrl}`);
                    }

                    const blob = await response.blob();
                    const blobUrl = URL.createObjectURL(blob);

                    return new Promise<{ id: EventAnimationId, blobUrl: EventAnimationBlobUrl }>((resolve, reject) => {
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
                                resolve({ id: attackId, blobUrl });
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

           
                
            const animationUrlBlobUrlMap = new Map();
            loadAnimationsResults.forEach((loadAnimationsResult) => {
                if(!loadAnimationsResult) {
                    return;
                }
                animationUrlBlobUrlMap.set(loadAnimationsResult.id, loadAnimationsResult.blobUrl);
            });

            setLoadedAnimationBlobUrls(animationUrlBlobUrlMap);
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
            loadedAnimationBlobUrls.forEach((blobUrl) => {
                URL.revokeObjectURL(blobUrl);
              });
        }
    }, [loadedAnimationBlobUrls]);


    return { isAnimationsLoaded, loadingProgress, loadedAnimationBlobUrls, loadError, startLoading };
};