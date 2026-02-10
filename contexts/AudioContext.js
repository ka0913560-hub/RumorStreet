'use client';

import { createContext, useContext, useState, useEffect, useRef } from 'react';

const AudioContext = createContext();

export function AudioProvider({ children }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        // Initialize audio element
        if (typeof window !== 'undefined') {
            audioRef.current = new Audio('/assets/audio/background-music.mp3');
            audioRef.current.loop = true;
            audioRef.current.volume = volume;

            // Load saved preferences from localStorage
            const savedVolume = localStorage.getItem('rumorstreet_volume');
            const savedMuted = localStorage.getItem('rumorstreet_muted');
            const savedPlaying = localStorage.getItem('rumorstreet_playing');

            if (savedVolume !== null) {
                const vol = parseFloat(savedVolume);
                setVolume(vol);
                audioRef.current.volume = vol;
            }

            if (savedMuted !== null) {
                const muted = savedMuted === 'true';
                setIsMuted(muted);
                audioRef.current.muted = muted;
            }

            if (savedPlaying === 'true') {
                // Auto-play if previously playing (with user interaction)
                audioRef.current.play().catch(err => {
                    console.log('Auto-play prevented:', err);
                });
                setIsPlaying(true);
            }
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play().catch(err => {
                console.error('Play error:', err);
            });
            setIsPlaying(true);
            localStorage.setItem('rumorstreet_playing', 'true');
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
            localStorage.setItem('rumorstreet_playing', 'false');
        }
    };

    const togglePlay = () => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    };

    const changeVolume = (newVolume) => {
        const vol = Math.max(0, Math.min(1, newVolume));
        setVolume(vol);
        if (audioRef.current) {
            audioRef.current.volume = vol;
        }
        localStorage.setItem('rumorstreet_volume', vol.toString());
    };

    const toggleMute = () => {
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        if (audioRef.current) {
            audioRef.current.muted = newMuted;
        }
        localStorage.setItem('rumorstreet_muted', newMuted.toString());
    };

    const value = {
        isPlaying,
        volume,
        isMuted,
        play,
        pause,
        togglePlay,
        changeVolume,
        toggleMute,
    };

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within AudioProvider');
    }
    return context;
}
