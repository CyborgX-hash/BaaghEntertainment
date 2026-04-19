'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SplashScreen({ children }: { children: React.ReactNode }) {
    // Start with splash VISIBLE so it's the first thing painted (no flash of content)
    const [showSplash, setShowSplash] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [splashDone, setSplashDone] = useState(false);

    useEffect(() => {
        const hasSeenSplash = sessionStorage.getItem('baagh_splash_shown');

        if (hasSeenSplash) {
            // Already seen — skip splash immediately
            setShowSplash(false);
            setSplashDone(true);
            return;
        }

        // First visit: show splash for 4.5 seconds, then fade out
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, 4500);

        // Remove splash after fade animation completes (4.5s + 0.8s fade)
        const removeTimer = setTimeout(() => {
            setShowSplash(false);
            setSplashDone(true);
            sessionStorage.setItem('baagh_splash_shown', 'true');
        }, 5300);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    return (
        <>
            {showSplash && (
                <div className={`splash-screen ${fadeOut ? 'splash-fade-out' : ''}`}>
                    <div className="splash-logo-container">
                        <Image
                            src="/images/Baagh.png"
                            alt="Baagh Entertainment"
                            width={280}
                            height={280}
                            priority
                            className="splash-logo"
                        />
                        <div className="splash-glow"></div>
                    </div>
                </div>
            )}
            <div style={{
                visibility: splashDone ? 'visible' : 'hidden',
                opacity: splashDone ? 1 : 0,
                transition: 'opacity 0.5s ease',
            }}>
                {children}
            </div>
        </>
    );
}
