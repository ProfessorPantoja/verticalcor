import React, { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

interface SmartVideoPlayerProps {
    videoId: string;
}

export const SmartVideoPlayer: React.FC<SmartVideoPlayerProps> = ({ videoId }) => {
    const wrapperRef = useRef<HTMLDivElement>(null); // Elemento que permanece no DOM
    const playerDivRef = useRef<HTMLDivElement>(null); // Elemento substituído pelo Iframe
    const playerInstance = useRef<any>(null);
    const loopCount = useRef(0);

    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const hasAutoPlayed = useRef(false);

    // Inicialização da API e Player
    useEffect(() => {
        const initPlayer = () => {
            if (playerInstance.current) return;
            if (!playerDivRef.current) return; // Precisa do elemento alvo

            playerInstance.current = new window.YT.Player(playerDivRef.current, {
                videoId: videoId,
                height: '100%',
                width: '100%',
                playerVars: {
                    autoplay: 0,
                    controls: 1,
                    mute: 1, // Autoplay requer mudo na maioria dos navegadores
                    rel: 0,
                    modestbranding: 1,
                    playsinline: 1, // Importante para mobile
                },
                events: {
                    'onStateChange': onPlayerStateChange,
                    'onReady': onPlayerReady
                }
            });
        };

        if (!window.YT) {
            if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
                const tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

                window.onYouTubeIframeAPIReady = () => {
                    initPlayer();
                };
            } else {
                // Se o script já existe, verificamos periodicamente ou hookamos no evento se possível
                // Simplificação segura: tentar init se YT já existir, senão aguardar
                const checkYT = setInterval(() => {
                    if (window.YT && window.YT.Player) {
                        clearInterval(checkYT);
                        initPlayer();
                    }
                }, 100);
                return () => clearInterval(checkYT);
            }
        } else {
            initPlayer();
        }
    }, [videoId]);

    const onPlayerReady = (event: any) => {
        setIsPlayerReady(true);
        event.target.mute(); // Garante mudo inicial
    };

    const onPlayerStateChange = (event: any) => {
        // YT.PlayerState.ENDED = 0
        if (event.data === 0) {
            loopCount.current += 1;
            if (loopCount.current < 3) { // 3 repetições (total 3 plays)
                event.target.playVideo();
            } else {
                loopCount.current = 0; // Reseta contador
            }
        }
    };

    // Monitora visibilidade do Wrapper
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.5 } // 50% visível para ativar
        );

        const currentWrapper = wrapperRef.current;
        if (currentWrapper) {
            observer.observe(currentWrapper);
        }

        return () => {
            if (currentWrapper) observer.unobserve(currentWrapper);
        };
    }, []);

    // Lógica de Autoplay: Reage a (Pronto + Visível)
    useEffect(() => {
        if (isPlayerReady && isInView && !hasAutoPlayed.current) {
            if (playerInstance.current && typeof playerInstance.current.playVideo === 'function') {
                // Tenta reproduzir
                playerInstance.current.mute(); // Reforça mudo antes do play
                playerInstance.current.playVideo();
                hasAutoPlayed.current = true;
            }
        }
    }, [isPlayerReady, isInView]);

    return (
        <div ref={wrapperRef} className="w-full h-full">
            {/* O YouTube substituirá esta div pelo iframe, mas o wrapperRef permanece para o Observer */}
            <div ref={playerDivRef} className="w-full h-full rounded-2xl" />
        </div>
    );
};
