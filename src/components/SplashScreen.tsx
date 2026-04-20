'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SplashScreen({ children }: { children: React.ReactNode }) {
    // Start with splash VISIBLE so it's the first thing painted (no flash of content)
    const [showSplash, setShowSplash] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [splashDone, setSplashDone] = useState(false);

    useEffect(() => {
        let hasSeenSplash = false;

        try {
            hasSeenSplash = sessionStorage.getItem('baagh_splash_shown') === 'true';
        } catch {
            // sessionStorage may be unavailable in some environments
            hasSeenSplash = true;
        }

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
            try {
                sessionStorage.setItem('baagh_splash_shown', 'true');
            } catch {
                // Ignore if sessionStorage is unavailable
            }
        }, 5300);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    // Fallback: if splash is still blocking after 7 seconds, force show content
    useEffect(() => {
        if (splashDone) return;

        const fallback = setTimeout(() => {
            setShowSplash(false);
            setSplashDone(true);
        }, 7000);

        return () => clearTimeout(fallback);
    }, [splashDone]);

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
