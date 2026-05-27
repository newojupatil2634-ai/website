/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { Heart, Music, Play, Pause, Gift, Sparkles, Star, PartyPopper, Cake, Camera, Mail, Volume2, VolumeX, Clapperboard } from "lucide-react";
import confetti from "canvas-confetti";

// --- Utility Components ---

const Typewriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const characters = text.split("");
  return (
    <div className="inline-block">
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: delay + i * 0.05,
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

const MouseGlow = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-30 opacity-30 mix-blend-overlay"
      animate={{
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(214, 40, 57, 0.15), transparent 80%)`,
      }}
    />
  );
};

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.3 + 0.1,
      };
      setHearts((prev) => [...prev.slice(-40), newHeart]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ bottom: -20, opacity: 0, x: 0 }}
          animate={{
            bottom: "110%",
            opacity: [0, heart.opacity, 0],
            x: [0, 30, -30, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{ left: `${heart.left}%` }}
        >
          <Heart
            size={heart.size}
            className="text-luxury-red fill-luxury-red"
            style={{ opacity: heart.opacity }}
          />
        </motion.div>
      ))}
      {/* Cinematic Light Leak */}
      <div className="absolute top-0 left-0 w-full h-full light-leak pointer-events-none opacity-20" />
    </div>
  );
};

// --- Experiences ---

const EntryOverlay = ({ onExplore }: { onExplore: () => void; key?: React.Key }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center text-center p-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-romantic opacity-50" />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="relative z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="mb-8"
        >
          <Heart size={48} className="text-luxury-red fill-luxury-red mx-auto opacity-30" />
        </motion.div>
        <h2 className="font-serif text-3xl md:text-5xl text-luxury-red mb-6 italic font-light tracking-tight">
          Someone Special Is Celebrating Today ❤️
        </h2>
        <p className="font-sans text-xs uppercase tracking-cinematic text-luxury-red/40 mb-12 font-bold">
          Step into a magical celebration
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onExplore}
          className="px-12 py-4 bg-luxury-red text-pearl rounded-full font-sans text-sm font-bold tracking-cinematic uppercase shadow-2xl hover:shadow-luxury-red/20 transition-all cursor-pointer"
        >
          Start Experience
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const Hero = ({ onOpen }: { onOpen: () => void; key?: React.Key }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      className="min-h-screen flex flex-col items-center justify-center relative px-4 text-center z-10"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 relative"
      >
        <div className="flex items-center justify-center gap-4 mb-8">
          <motion.div 
             initial={{ width: 0 }} 
             animate={{ width: 48 }} 
             transition={{ delay: 0.8, duration: 1 }} 
             className="h-[1px] bg-luxury-red opacity-30" 
          />
          <span className="uppercase tracking-cinematic text-[11px] font-sans font-extrabold text-luxury-red/60">
             <Typewriter text="A Cinematic Celebration" delay={1} />
          </span>
          <motion.div 
             initial={{ width: 0 }} 
             animate={{ width: 48 }} 
             transition={{ delay: 0.8, duration: 1 }} 
             className="h-[1px] bg-luxury-red opacity-30" 
          />
        </div>
        <h1 className="font-serif text-7xl md:text-9xl text-luxury-red mb-6 font-light tracking-tight leading-tight">
          Happy Birthday, <br /> 
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="font-bold italic cinematic-glow"
          >
            Nikhil ❤️
          </motion.span>
        </h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="font-serif text-xl md:text-2xl text-luxury-red italic max-w-2xl mx-auto leading-relaxed"
        >
          To the boy who makes my world feel softer, brighter, and more beautiful.
        </motion.p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpen}
        className="px-12 py-5 bg-luxury-red text-pearl rounded-full font-sans text-sm font-bold tracking-cinematic uppercase shadow-2xl hover:bg-crimson-red transition-all cursor-pointer relative overflow-hidden group mb-20"
      >
        <span className="relative z-10">Open Your Surprise</span>
        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      </motion.button>

      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-16 opacity-30"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-luxury-red to-transparent" />
      </motion.div>
    </motion.section>
  );
};

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log("Video play failed:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  return (
    <section className="py-40 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl w-full text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
           <Clapperboard className="text-luxury-red opacity-30 animate-pulse" size={24} />
           <p className="font-sans text-[10px] uppercase tracking-cinematic font-bold text-luxury-red/50">A Special Memory For You</p>
        </div>
        <h2 className="font-serif text-5xl text-luxury-red mb-16 italic font-light">Cinematic Dreamy Moments</h2>
        
        <div className="relative group perspective-1000">
          <motion.div
            whileHover={{ rotateX: 1, rotateY: -1, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="aspect-video bg-white/50 backdrop-blur-sm rounded-[40px] shadow-2xl artistic-shadow border border-white overflow-hidden relative cursor-pointer"
            onClick={togglePlay}
          >
            {/* Real HTML5 Video element */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-[40px] transition-all duration-1000"
              loop
              muted={isMuted}
              onEnded={handleVideoEnded}
              playsInline
              poster="/nikhil_4.jpg"
            >
              <source src="/public/nikhil_video.mp4" type="video/mp4" />
             
              Your browser does not support the video tag.
            </video>

            {/* Custom Overlay (hidden when playing unless hovered) */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col items-center justify-center p-12 text-white"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-20 h-20 bg-white/90 text-luxury-red rounded-full flex items-center justify-center shadow-2xl mb-6 hover:bg-white transition-all pointer-events-none"
                  >
                    <Play size={32} fill="currentColor" className="ml-1" />
                  </motion.div>
                  <p className="font-serif italic text-2xl drop-shadow-md text-white mb-2">Our Sweet Walks & Soft Conversations ❤️</p>
                  <p className="font-sans text-[10px] uppercase tracking-widest mt-2 opacity-80 font-bold bg-luxury-red/80 px-4 py-1.5 rounded-full shadow-lg">Click to Play Chapter</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ambient subtle watermarked-style text on playing screen */}
            {isPlaying && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none text-white/50 text-xs font-serif italic text-center drop-shadow px-6">
                "Happy birthday to the boy who makes my steps feel lighter and my heart fuller."
              </div>
            )}

            {/* Mini Player HUD controls at the bottom */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center z-20 pointer-events-auto bg-black/30 backdrop-blur-md rounded-full px-5 py-2.5 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                onClick={(e) => { e.stopPropagation(); togglePlay(); }} 
                className="text-white hover:text-luxury-red transition-colors flex items-center gap-1.5 text-xs font-sans tracking-wider"
              >
                {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                <span className="font-extrabold uppercase text-[9px]">{isPlaying ? "Pause" : "Play"}</span>
              </button>

            

              <button 
                onClick={toggleMute} 
                className="text-white hover:text-luxury-red transition-colors"
                title={isMuted ? "Unmute video audio" : "Mute video audio"}
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
            </div>
            
            {/* Elegant Double Border Frame */}
            <div className="absolute inset-0 border-[16px] border-white/20 pointer-events-none rounded-[40px]" />
          </motion.div>

         
          {/* Decorative Floating Sparkle-Heart */}
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-8 -right-8 w-24 h-24 bg-white/80 rounded-full flex items-center justify-center shadow-xl border border-red-50 z-20 pointer-events-none"
          >
            <Heart size={32} className="text-luxury-red fill-luxury-red animate-pulse opacity-85" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const Polaroid = ({ image, caption, subcaption, rotation }: { image: string; caption: string; subcaption: string; rotation: number; key?: React.Key }) => {
  return (
    <motion.div
      whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
      initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white p-4 pb-6 shadow-2xl artistic-shadow rounded-sm transform w-72 md:w-80 border border-red-50 flex flex-col items-center"
    >
      <div className="aspect-square bg-soft-white mb-4 overflow-hidden relative group w-full">
        <img src={image} alt={caption} className="w-full h-full object-cover animate-slow-pan hover:pause grayscale-[0.1] hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-luxury-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="absolute inset-0 shadow-inner pointer-events-none" />
      </div>
      <p className="font-sans text-[11px] uppercase tracking-cinematic text-center text-luxury-red py-1 font-bold">{caption}</p>
      <p className="font-serif italic text-xs text-gray-500 text-center px-2 mt-2 leading-relaxed">{subcaption}</p>
    </motion.div>
  );
};

const MemoryGallery = () => {
  const memories = [
    { 
      image: "/nikhil_1.jpg", 
      caption: "Candid Perfection 🤎", 
      subcaption: "Adjusting your collar, looking effortlessly perfect. Every candid moment of yours is my absolute favorite.",
      rotation: -4 
    },
    { 
      image: "/nikhil_2.jpg", 
      caption: "Serene Horizons 🌅", 
      subcaption: "Under the quiet canopy, your gaze captures the peaceful beauty of the world. Just like how you captured my heart.",
      rotation: 3 
    },
    { 
      image: "/nikhil_3.jpg", 
      caption: "That Irresistible Smile 🥰", 
      subcaption: "That charming, soft smile of yours has the power to brighten up my entire universe in an instant.",
      rotation: -2 
    },
    { 
      image: "/nikhil_4.jpg", 
      caption: "My Infinite Happiness ❤️", 
      subcaption: "Standing tall, radiating warmth, and being the sweetest part of my life. Happy Birthday to my favorite boy.",
      rotation: 4 
    },
  ];

  return (
    <section className="py-40 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center mb-24">
        <div className="flex items-center justify-center gap-3 mb-6">
           <Camera className="text-luxury-red opacity-30" size={20} />
           <p className="font-sans text-luxury-red/50 uppercase tracking-cinematic text-[10px] font-bold">Moments captured in time</p>
        </div>
        <h2 className="font-serif text-6xl text-luxury-red italic font-light tracking-tight">Memory Gallery</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-16 max-w-7xl mx-auto">
        {memories.map((m, i) => (
          <Polaroid key={i} image={m.image} caption={m.caption} subcaption={m.subcaption} rotation={m.rotation} />
        ))}
      </div>
    </section>
  );
};

const HeartLetter = () => {
  return (
    <section className="py-40 px-4 relative flex flex-col items-center">
      {/* Cinematic Spotlight Background */}
      <div className="absolute inset-0 spotlight pointer-events-none opacity-40 z-0" />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto bg-white/90 backdrop-blur-xl p-16 md:p-24 rounded-[60px] shadow-2xl artistic-shadow relative border border-white/50 z-10"
      >
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-luxury-red rounded-full flex items-center justify-center text-white shadow-xl shadow-red-900/30">
          <Mail size={32} />
        </div>
        <div className="space-y-10 text-center">
          <p className="font-serif text-4xl italic text-luxury-red mb-12 font-light">To my favorite person ❤️,</p>
          <div className="font-sans font-light text-xl text-gray-800 leading-relaxed space-y-8">
            <p className="italic">"Happy Birthday to the boy who makes my world feel softer, brighter, and so much more beautiful just by being in it. Every little thing about you — your smile, your voice, your heart — means more to me than words could ever explain."</p>
            <p>I hope today surrounds you with endless happiness, sweet memories, and all the love you truly deserve. You are genuinely one of the most special people to ever enter my life, and I’ll always be grateful for you.</p>
            <p>No matter how much time passes, you’ll always have a very precious place in my heart ❤️.</p>
          </div>
          <p className="font-serif text-3xl text-luxury-red mt-16 italic font-bold">Happy Birthday, <br /> my love NIKHIL ❤️</p>
        </div>
        
        {/* Floating Sparkles Decoration */}
        <div className="absolute top-10 right-10 opacity-20"><Sparkles size={40} className="text-luxury-red" /></div>
        <div className="absolute bottom-10 left-10 opacity-20"><Star size={40} className="text-luxury-red" /></div>
      </motion.div>
    </section>
  );
};

const SurpriseHeart = ({ message, emoji }: { message: string; emoji: string; key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.15, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="w-20 h-20 rounded-full flex items-center justify-center bg-white shadow-xl artistic-shadow border border-red-50 group cursor-pointer relative overflow-hidden"
      >
        <Heart className="w-8 h-8 text-luxury-red fill-luxury-red/10 group-hover:fill-luxury-red transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/0 to-red-50 group-hover:opacity-100 opacity-0 transition-opacity" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: -100 }}
            exit={{ opacity: 0, scale: 0.5, y: -120 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-56 text-center z-[60]"
          >
            <div className="bg-white/95 backdrop-blur-2xl p-6 rounded-[30px] shadow-2xl border border-red-50 artistic-shadow">
              <span className="text-3xl mb-3 block">{emoji}</span>
              <p className="text-sm font-serif italic text-luxury-red leading-relaxed mb-4">{message}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="text-[10px] uppercase tracking-cinematic text-gray-400 font-extrabold hover:text-luxury-red transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InteractiveSurprises = () => {
  const surprises = [
    { emoji: "🌹", message: "Happy Birthday to the sweetest soul ❤️✨" },
    { emoji: "🫶", message: "You deserve all the love and happiness today and always ❤️" },
    { emoji: "❤️", message: "Happy Birthday handsome ❤️" },
    { emoji: "🌟", message: "May your smile always shine this bright ❤️✨" },
    { emoji: "💌", message: "Forever grateful for you. Happy Birthday ❤️" },
    { emoji: "❤️", message: "Wishing you love, laughter, and endless happiness ❤️🎉" },
  ];

  return (
    <section className="py-40 px-4 relative overflow-hidden">
      <div className="max-w-2xl mx-auto p-16 rounded-[60px] bg-white border border-red-50 shadow-2xl artistic-shadow relative">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
             <Star className="text-luxury-red opacity-30" size={16} />
             <p className="text-[10px] font-sans font-bold uppercase tracking-cinematic opacity-50">Heartfelt Tidings</p>
             <Star className="text-luxury-red opacity-30" size={16} />
          </div>
          <h2 className="font-serif text-4xl text-luxury-red italic font-light tracking-tight">Sweet Surprises</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 justify-items-center">
          {surprises.map((s, i) => (
            <SurpriseHeart key={i} emoji={s.emoji} message={s.message} />
          ))}
        </div>
        
        {/* Glow effect */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-luxury-red/5 blur-[50px] rounded-full" />
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-luxury-red/5 blur-[50px] rounded-full" />
      </div>
    </section>
  );
};

const BirthdayCakeSection = () => {
  const [lit, setLit] = useState(true);
  const [candlesBlownOut, setCandlesBlownOut] = useState(false);

  const blowOut = () => {
    if (!lit) return;
    setLit(false);
    setTimeout(() => {
      setCandlesBlownOut(true);
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#b11226", "#d62839", "#ffffff", "#ff758f"],
        scalar: 1.2
      });
      // Fire more confetti after a delay
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.7 },
          colors: ["#b11226", "#ffffff"]
        });
      }, 500);
    }, 500);
  };

  return (
    <section className="py-40 px-4 flex flex-col items-center">
      <div className="max-w-lg w-full p-16 rounded-[60px] bg-luxury-red text-white shadow-2xl artistic-shadow flex flex-col items-center cursor-pointer relative overflow-hidden group" onClick={blowOut}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-8 shadow-xl relative z-10">
          <Cake size={40} className="cinematic-glow" />
        </div>
        <div className="text-center mb-12 relative z-10">
          <span className="text-[11px] font-sans font-bold uppercase tracking-cinematic opacity-60">Immortalize a Wish</span>
          <h3 className="font-serif text-4xl italic mt-3 font-light">Blow the Candles</h3>
        </div>

        <div className="relative w-64 flex justify-center perspective-1000 z-10">
           {/* Abstract Cake Design */}
           <div className="w-full h-32 bg-white/10 rounded-2xl flex justify-around items-end pb-4 relative overflow-hidden border border-white/20">
             <div className="absolute inset-x-0 top-0 h-2 bg-white/30" />
             <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent shadow-inner" />
             
             {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col items-center mb-6 relative">
                 {lit && (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7], rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                    className="w-4 h-7 bg-yellow-300 rounded-full blur-[2px] shadow-[0_0_15px_white] mb-1"
                  />
                 )}
                 {!lit && (
                    <motion.div
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: [0, 0.5, 0], y: -30 }}
                      transition={{ duration: 1.2 }}
                      className="w-6 h-10 bg-white/20 rounded-full blur-xl absolute -top-8"
                    />
                 )}
                 <div className="w-2 h-10 bg-white rounded-full shadow-lg opacity-80" />
              </div>
             ))}
           </div>
        </div>

        <AnimatePresence>
          {candlesBlownOut && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 text-center italic text-2xl font-serif z-10"
            >
              May your soul always reflect the <br /> beauty of your wishes! ✨
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const MusicPlayer = ({ isPlaying, onToggle }: { isPlaying: boolean; onToggle: () => void }) => {
  return (
    <div className="fixed bottom-8 right-8 z-[80]">
      <div className="bg-white/80 backdrop-blur-2xl p-3 flex items-center gap-5 rounded-full shadow-2xl artistic-shadow border border-white/50 group">
        <motion.div
          animate={isPlaying ? { 
            rotate: 360,
            scale: [1, 1.1, 1]
          } : {}}
          transition={{ 
            rotate: { repeat: Infinity, duration: 12, ease: "linear" },
            scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }}
          className="w-14 h-14 bg-luxury-red rounded-full flex items-center justify-center text-white shadow-lg shadow-red-900/20"
        >
          <Music size={24} />
        </motion.div>

        <div className="flex flex-col pr-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-cinematic text-luxury-red font-extrabold opacity-40">Immersion</span>
            {isPlaying && (
               <div className="flex gap-0.5 items-end h-2">
                 {[...Array(4)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      animate={{ height: [2, 8, 2] }} 
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.15 }}
                      className="w-[1.5px] bg-luxury-red rounded-full"
                    />
                 ))}
               </div>
            )}
          </div>
          <p className="text-sm font-bold text-luxury-red font-serif italic">Nikhil's Melody</p>
        </div>

        <button
          onClick={onToggle}
          className="w-12 h-12 rounded-full flex items-center justify-center bg-luxury-red hover:bg-crimson-red text-white transition-all transform hover:scale-110 shadow-lg shadow-red-900/20 active:scale-95 cursor-pointer"
        >
          {isPlaying ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
    </div>
  );
};

const FinalCelebration = () => {
    useEffect(() => {
        const end = Date.now() + 3000;
        const colors = ["#b11226", "#ffffff", "#ff758f", "#d62839"];

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }, []);

    return (
        <section className="min-h-screen py-40 px-8 bg-white flex flex-col items-center justify-center text-center relative overflow-hidden">
             <FloatingHearts />
             <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="max-w-4xl relative z-10"
             >
                <motion.div 
                    initial={{ y: 20, opacity: 0 }} 
                    whileInView={{ y: 0, opacity: 1 }} 
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <Heart size={64} className="text-luxury-red fill-luxury-red mx-auto mb-10 cinematic-glow" />
                </motion.div>
                <h3 className="font-serif text-7xl md:text-9xl text-luxury-red mb-10 italic font-light tracking-tighter leading-tight">
                    You Are <br /> <span className="font-bold underline decoration-red-100 underline-offset-8">Deeply Loved</span> ❤️
                </h3>
                <div className="flex items-center justify-center gap-4 mt-20 opacity-30">
                    <div className="h-[1px] w-24 bg-luxury-red"></div>
                    <p className="font-sans text-[11px] uppercase tracking-cinematic font-bold">Forever & Always</p>
                    <div className="h-[1px] w-24 bg-luxury-red"></div>
                </div>
             </motion.div>
             
             {/* Large background heart */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none transform scale-[3]">
                <Heart size={500} fill="currentColor" className="text-luxury-red" />
             </div>
        </section>
    );
};

const Footer = () => {
  return (
    <footer className="py-24 px-8 bg-soft-white border-t border-red-50 flex flex-col items-center justify-center gap-10">
      <div className="flex items-center gap-8">
        <Heart className="w-10 h-10 text-luxury-red opacity-20" />
        <div className="text-center md:text-left">
          <p className="text-[11px] font-sans font-extrabold uppercase tracking-cinematic text-luxury-red opacity-30 mb-2">A Premium Cinematic Experience</p>
          <p className="font-serif italic text-2xl text-luxury-red font-light">Happy Birthday, Sweet Nikhil ❤️</p>
        </div>
        <Heart className="w-10 h-10 text-luxury-red opacity-20" />
      </div>
      
      <div className="flex gap-4">
        {[...Array(5)].map((_, i) => (
            <motion.div 
              key={i}
              className="w-2 h-2 rounded-full bg-luxury-red" 
              animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.2, 1] }} 
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
            />
        ))}
      </div>

      <div className="text-center">
        <p className="text-[10px] font-sans font-bold uppercase tracking-cinematic opacity-30 font-bold">Crafted with infinite love</p>
        <p className="text-[9px] uppercase tracking-widest mt-2 opacity-10">© 2026 Ethereal Celebrations</p>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
      target: experienceRef,
      offset: ["start start", "end end"]
  });

  const handleOpen = () => {
    setIsOpen(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#b11226", "#ffffff", "#ff758f"],
      scalar: 1.2
    });
    
    // Smooth scroll to content
    setTimeout(() => {
        const gallery = document.getElementById("gallery");
        if (gallery) {
            gallery.scrollIntoView({ behavior: "smooth" });
        }
    }, 100);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Playback failed:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const startExperience = () => {
      setShowIntro(false);
      setIsPlaying(true);
      if (audioRef.current) {
          audioRef.current.play().catch(err => console.log("Auto-play blocked:", err));
      }
  };

  return (
    <main className="relative bg-[#f8f8f8] min-h-screen selection:bg-luxury-red/20 font-serif overflow-x-hidden">
      {/* Cinematic Overlays */}
      <MouseGlow />
      
      {/* Hidden Audio element with volume curve support */}
      <audio
        ref={audioRef}
        src="/twisterium-happy-birthday-482411.mp3"
        loop
      />

      <AnimatePresence mode="wait">
        {showIntro && <EntryOverlay onExplore={startExperience} key="entry" />}
      </AnimatePresence>

      <div ref={experienceRef} className="relative z-10">
        {/* Ambient Glows */}
        <div className="fixed top-[-10%] right-[-10%] w-[800px] h-[800px] ambient-glow-top rounded-full opacity-60 pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] left-[-10%] w-[700px] h-[700px] ambient-glow-bottom rounded-full opacity-30 pointer-events-none z-0" />

        <FloatingHearts />
        
        <AnimatePresence>
            {!showIntro && (
                <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} />
            )}
        </AnimatePresence>

        <AnimatePresence>
            {!showIntro && !isOpen && <Hero onOpen={handleOpen} key="hero" />}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="flex flex-col"
            >
              <div id="gallery"><MemoryGallery /></div>
              <VideoSection />
              <HeartLetter />
              <InteractiveSurprises />
              <BirthdayCakeSection />
              <FinalCelebration />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cinematic Progress Line */}
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 right-0 h-1.5 bg-luxury-red origin-left z-[90] shadow-[0_0_15px_rgba(177,18,38,0.5)]"
            style={{ scaleX: scrollYProgress }}
          >
            <div className="absolute inset-0 bg-white/30 animate-shimmer" />
          </motion.div>
        )}
      </div>
    </main>
  );
}
