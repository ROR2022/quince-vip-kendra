// ⛪ CeremonySection - Sección de información de la ceremonia

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { quinceMainData } from "./data/main-data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getAnimationConfig } from "@/data/animationConfig";

export default function CeremonySection() {
  
  const { parents, ceremony, party } = quinceMainData.event;
  const sectionRef = useRef(null);
  
  // Estados para animaciones teatrales escalonadas
  const [isInView, setIsInView] = useState(false);
  const [curtainVisible, setCurtainVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [ceremonyCardVisible, setCeremonyCardVisible] = useState(false);
  const [partyCardVisible, setPartyCardVisible] = useState(false);

  // Hook personalizado para IntersectionObserver
  const useIntersectionObserver = useCallback(() => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Secuencia teatral escalonada
            setTimeout(() => setCurtainVisible(true), 200);
            setTimeout(() => setImageVisible(true), 600);
            setTimeout(() => setCeremonyCardVisible(true), 1000);
            setTimeout(() => setPartyCardVisible(true), 1400);
          } else {
            // Reset cuando sale de vista
            setIsInView(false);
            setCurtainVisible(false);
            setImageVisible(false);
            setCeremonyCardVisible(false);
            setPartyCardVisible(false);
          }
        },
        {
          threshold: 0.3,
          rootMargin: '-50px 0px'
        }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }, []);
  }, []);

  useIntersectionObserver();

  // Función helper para clases de animación elegante
  const getElegantAnimationClass = (isVisible, animationType, delay = '') => {
    return isVisible ? `animate-${animationType} ${delay}` : '';
  };

  const basicClass = "text-2xl font-bold text-white";
  const completeClass = "text-2xl font-bold text-white animate-elegant-float";

  // Configurar animación de scroll
  const animationConfig = getAnimationConfig("ceremony");
  // Ya no necesitamos el hook useScrollAnimation, usamos nuestro IntersectionObserver

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url('${parents.backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
      id="ceremony"
      className="py-20 relative overflow-hidden"
    >

      {/* Cortina teatral de entrada */}
      <div className={getElegantAnimationClass(curtainVisible, 'curtain-reveal', 'delay-200')}>
        
        {/* Elementos decorativos elegantes flotantes */}
        <div className="elegant-element top-12 left-12 animate-elegant-float delay-300">
          <span className="text-4xl mask-icon animate-mask-spin">🎭</span>
        </div>
        <div className="elegant-element top-16 right-16 animate-elegant-float delay-600">
          <span className="text-3xl celebration-icon">✨</span>
        </div>
        <div className="elegant-element bottom-20 left-20 animate-elegant-float delay-900">
          <span className="text-3xl celebration-icon">🎪</span>
        </div>
        <div className="elegant-element bottom-16 right-20 animate-elegant-float delay-1200">
          <span className="text-4xl mask-icon animate-mask-spin">🎭</span>
        </div>

        {/* Confetti elegante flotante */}
        {Array.from({length: 12}).map((_, i) => (
          <div 
            key={i}
            className={`confetti-piece animate-confetti-drop ${
              i % 3 === 0 ? 'confetti-gold' : 
              i % 3 === 1 ? 'confetti-pink' : 'confetti-white'
            }`}
            style={{
              left: `${5 + i * 8}%`,
              animationDelay: `${i * 0.8}s`
            }}
          />
        ))}

        <div className="container text-white mx-auto px-4 p-6 rounded-2xl relative z-10">
          <div className="max-w-6xl mx-auto">
            
            {/* Layout tipo escenario con imagen central */}
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              
              {/* Card de Ceremonia - Slide desde izquierda */}
              <div className={getElegantAnimationClass(ceremonyCardVisible, 'card-slide-left', 'delay-400')}>
                <div className="ceremony-card rounded-2xl p-8 text-center space-y-6 animate-theatrical-glow">
                  <div className="text-5xl text-yellow-400 font-main-text mb-4 elegant-text-glow">
                    Ceremonia
                  </div>
                  <h4 className={ceremonyCardVisible ? completeClass : basicClass}>
                    {ceremony.venue}
                  </h4>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-6 h-6 text-yellow-400" />
                    <span className="text-2xl font-medium elegant-text-glow">
                      {ceremony.time}
                    </span>
                  </div>
                  <p className="text-white/80">
                    {ceremony.address}
                  </p>
                  <Button
                    onClick={() => window.open(ceremony.ubiLink, "_blank")}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-full px-8 py-3 transform hover:scale-105 transition-all duration-300"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Ir al mapa
                  </Button>
                </div>
              </div>

              {/* Imagen central con efecto spotlight */}
              <div className={getElegantAnimationClass(imageVisible, 'curtain-reveal', 'delay-600')}>
                <div className="spotlight-image relative w-full h-96 rounded-2xl shadow-2xl overflow-hidden mx-auto">
                  <Image
                    src={ceremony.ceremonyImage}
                    alt="Ceremony Image"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* El efecto spotlight se aplica via CSS */}
                </div>
              </div>

              {/* Card de Recepción - Slide desde derecha */}
              <div className={getElegantAnimationClass(partyCardVisible, 'card-slide-right', 'delay-800')}>
                <div className="ceremony-card rounded-2xl p-8 text-center space-y-6 animate-theatrical-glow">
                  <div className="text-5xl text-pink-400 font-main-text mb-4 elegant-text-glow">
                    Recepción
                  </div>
                  <h4 className={partyCardVisible ? completeClass : basicClass}>
                    {party.venue}
                  </h4>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-6 h-6 text-pink-400" />
                    <span className="text-2xl font-medium elegant-text-glow">
                      {party.time}
                    </span>
                  </div>
                  <p className="text-white/80">
                    {party.address}
                  </p>
                  <Button
                    onClick={() => window.open(party.ubiLink, "_blank")}
                    className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-8 py-3 transform hover:scale-105 transition-all duration-300"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Ir al mapa
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
