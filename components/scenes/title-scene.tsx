"use client";
import { Sparkles } from "@/components/sparkles";
import { TypewriterText } from "@/components/typewriter-text";
import { useState, useEffect } from "react";
import Image from "next/image";

interface TitleSceneProps {
  onComplete: () => void;
  isActive: boolean;
}

export function TitleScene({ onComplete, isActive }: TitleSceneProps) {
  const [showTitle, setShowTitle] = useState(false);
  const [allTextComplete, setAllTextComplete] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [coronaVideoLoaded, setCoronaVideoLoaded] = useState(false);

  // Handle video loading
  const handleVideoLoaded = () => {
    console.log('Main video loaded successfully');
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.log('Main video failed to load, using fallback');
    setVideoError(true);
    setVideoLoaded(true); // Proceed with fallback image
  };

  const handleCoronaVideoLoaded = () => {
    console.log('Corona video loaded successfully');
    setCoronaVideoLoaded(true);
  };

  // Fallback timeout - if video doesn't load in 5 seconds, proceed anyway
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!videoLoaded) {
        console.log('Video loading timeout, proceeding with fallback');
        setVideoLoaded(true);
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(fallbackTimer);
  }, [videoLoaded]);

  // Handle 2 second delay before advancing to next scene
  useEffect(() => {
    if (allTextComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000); // 2 seconds delay

      return () => clearTimeout(timer);
    }
  }, [allTextComplete, onComplete]);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        onLoadedData={handleVideoLoaded}
        onCanPlay={handleVideoLoaded}
        onError={handleVideoError}
        style={{
          opacity: videoLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        <source src="/video/kendra2.mp4" type="video/mp4" />
        {/* Fallback to image if video fails to load */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('/images/fondoKendra1.png')`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: videoError ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
        />
      </video>

      {/* Minimal overlay only if needed for text readability */}
      {/* <div className="absolute inset-0 bg-black/15 z-10" /> */}

      {/* Loading Indicator */}
      {!videoLoaded && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/30">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent mx-auto"></div>
            <p className="text-white text-lg font-semibold">Cargando experiencia...</p>
          </div>
        </div>
      )}
      
      <Sparkles count={25} />

      {/* Corona Video - Animated and Natural Looking */}
      {videoLoaded && (
        <div className="absolute top-6 left-1/2 z-30" style={{ transform: 'translateX(-50%)' }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 object-cover rounded-full animate-fade-in-scale"
            onLoadedData={handleCoronaVideoLoaded}
            onCanPlay={handleCoronaVideoLoaded}
            style={{
              filter: 'brightness(1.1) contrast(1.05)',
              maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
              animation: 'fadeInScale 2s ease-out, floatAndGlow 4s ease-in-out infinite 2s',
              display: 'block',
              margin: '0 auto',
              opacity: coronaVideoLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out'
            }}
          >
            <source src="/video/corona1.mp4" type="video/mp4" />
            {/* Fallback to static crown image if video fails */}
            <img 
              src="/golden-princess-crown.jpg" 
              alt="Corona" 
              className="w-full h-full object-contain"
              style={{
                opacity: coronaVideoLoaded ? 0 : 1,
                transition: 'opacity 0.5s ease-in-out'
              }}
            />
          </video>
        </div>
      )}

      {/* Main Title and Subtitle */}
      {videoLoaded && (
        <div className="text-center z-30 mt-32 md:mt-40 lg:mt-48 space-y-6 px-4">
          {/* Subtitle - Mis XV años (appears first) */}
          <div className="mb-4">
            <TypewriterText
              text="Mis XV años"
              delay={100}
              className="font-script text-3xl md:text-4xl lg:text-5xl text-pink-600 font-light tracking-wider drop-shadow-lg"
              onComplete={() => setShowTitle(true)}
              isActive={isActive}
            />
          </div>

          {/* Main Title - Kendra (appears after subtitle) */}
          {showTitle && (
            <div className="animate-fade-in">
              <TypewriterText
                text="Kendra"
                delay={150}
                className="font-main-text text-6xl md:text-8xl lg:text-9xl text-amber-500 font-bold tracking-wide drop-shadow-2xl"
                onComplete={() => setAllTextComplete(true)}
                isActive={isActive}
              />
            </div>
          )}
        </div>
      )}

      {/* Subtle gradient only at the bottom for any text that might appear */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent z-20" />
    </div>
  );
}
