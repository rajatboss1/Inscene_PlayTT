import React, { useState, useEffect, useRef } from 'react';
import Logo from './components/Logo.tsx';
import ChatPanel from './components/ChatPanel.tsx';
import { Analytics } from "@vercel/analytics/react";

/**
 * Optimized Image Proxy Utility
 */
const getSmartImageUrl = (url: string, v: string = '1', w: number = 800, h: number = 800) => {
  if (!url) return '';
  if (url.includes('drive.google.com') || url.includes('googleusercontent.com')) return url; 
  const cacheBuster = `v${v}_${new Date().getDate()}_${new Date().getHours()}`;
  const encodedUrl = encodeURIComponent(url);
  return `https://wsrv.nl/?url=${encodedUrl}&w=${w}&h=${h}&fit=cover&a=top&output=jpg&q=85&il&maxage=7d&t=${cacheBuster}`;
};

/**
 * CHARACTER AVATARS
 */
const PRIYANK_AVATAR = "https://lh3.googleusercontent.com/d/16mQvERxp6rIlxOHMTLKoeC_-WxuqxS-C";
const ARZOO_AVATAR = "https://lh3.googleusercontent.com/d/147CA6EL86D7QP1SWhA_XJWRQpQ9VRi8O";
const DEBU_AVATAR = "https://lh3.googleusercontent.com/d/14o-9uKeKJVy9aa0DPMCFA43vP0vJPGM3";

/**
 * Character Avatar Component
 */
const CharacterDP: React.FC<{ src: string, name: string, theme: 'blue' | 'pink' | 'purple', size?: string }> = ({ src, name, theme, size = "w-16 h-16" }) => {
  const [error, setError] = useState(false);
  const borderColor = theme === 'blue' ? 'border-blue-500' : theme === 'pink' ? 'border-pink-500' : 'border-purple-500';
  const bgColor = theme === 'blue' ? 'bg-blue-600/40' : theme === 'pink' ? 'bg-pink-600/40' : 'bg-purple-600/40';

  return (
    <div className={`relative ${size} rounded-full flex items-center justify-center p-0.5 border-2 shadow-2xl transition-all duration-300 group-hover:scale-105 ${borderColor} ${bgColor}`}>
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-black rounded-full animate-pulse shadow-[0_0_12px_#22c55e] z-30" />
      <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
        {!error ? (
          <img 
            src={src} 
            alt={name} 
            className="w-full h-full object-cover"
            onError={() => setError(true)}
          />
        ) : (
          <span className="text-xl font-black text-white">{name[0]}</span>
        )}
      </div>
    </div>
  );
};

/**
 * SERIES CATALOG
 */
const SERIES_CATALOG = [
  {
    id: 'heart-beats',
    title: 'Heart Beats',
    tagline: 'Your choices define your rhythm.',
    thumbnail: getSmartImageUrl("https://lh3.googleusercontent.com/d/11oMmLSZFpeZsoGxw2uV_bPEWJB4-fvDx", "thumb_v4", 1200, 1200),
    accentColor: '#3b82f6',
    reelHint: 'Roleplay with the characters to change their destiny',
    avatars: {
      Priyank: PRIYANK_AVATAR,
      Arzoo: ARZOO_AVATAR
    },
    episodes: [
      { 
        id: 1, 
        label: "Episode 01", 
        url: "https://github.com/rajatboss1/plivetv/releases/download/Video/Heart.Beats.Episode.2.mp4", 
        triggers: [
          { char: 'Priyank', intro: "Hey, itni jaldi kahan ja rahi ho? 😉", hook: "We just met at Lodhi Garden. You are walking away." }, 
          { char: 'Arzoo', intro: "Excuse me? Follow kar rahe ho kya? 🤨", hook: "Catching Priyank following me at Lodhi Garden." }
        ] 
      },
      { 
        id: 2, 
        label: "Episode 02", 
        url: "https://github.com/rajatboss1/plivetv/releases/download/Video/Heart.Beats.Episode.1.mp4", 
        triggers: [
          { char: 'Priyank', intro: "Lizard wala joke bura tha kya? 😂", hook: "After the awkward lizard joke during tiffin." }, 
          { char: 'Arzoo', intro: "Seriously? Itna ghatiya joke... 🙄", hook: "Responding to Priyank's weird lizard pickup line." }
        ] 
      },
      { 
        id: 3, 
        label: "Episode 03", 
        url: "https://github.com/rajatboss1/plivetv/releases/download/Video/Heart.Beats.Episode.3.mp4", 
        triggers: [
          { char: 'Priyank', intro: "Dinner was nice. Gher pahunch gayi? ❤️", hook: "Date just ended. Checking if Arzoo reached home." }, 
          { char: 'Arzoo', intro: "Khana toh thik tha, par company... hmm. 😉", hook: "Teasing Priyank about the date after reaching home." }
        ] 
      },
      { 
        id: 4, 
        label: "Episode 04", 
        url: "https://github.com/rajatboss1/plivetv/releases/download/Video/Heart.Beats.Episode.4.mp4", 
        triggers: [
          { char: 'Priyank', intro: "Waise... hum hai kya exactly? 💓", hook: "In the park, trying to define the relationship." }, 
          { char: 'Arzoo', intro: "Park mein itni deep baatein? Mood kharab mat karo. 😂", hook: "Being evasive about 'defining' us in the park." }
        ] 
      }
    ]
  },
  {
    id: 'deb-filmmaker',
    title: 'Deb The Filmmaker',
    tagline: 'Life is a movie be a director',
    thumbnail: getSmartImageUrl("https://lh3.googleusercontent.com/d/1BGjtlHgMy4BToZJQ-eOhr-UpH82LOMVh", "deb_thumb_v1", 1200, 1200),
    accentColor: '#a855f7',
    reelHint: 'Ask Debu your questions',
    avatars: {
      Debu: DEBU_AVATAR
    },
    episodes: [
      { 
        id: 1, 
        label: "Scene 01", 
        url: "https://github.com/rajatboss1/DebuTv_videostorange/releases/download/video/Episode1_Debu.mp4", 
        triggers: [
          { char: 'Debu', intro: "Welcome. Before we ever touch a camera, we must sharpen the mind. Tell me, what draws you to cinema?", hook: "Assessment of the user's cinematic palate." }
        ] 
      },
      { 
        id: 2, 
        label: "Scene 02", 
        url: "https://github.com/rajatboss1/DebuTv_videostorange/releases/download/video/Episode2_Debu.mp4", 
        triggers: [
          { char: 'Debu', intro: "Creative Resource Management is an art. Quality is a choice, not a budget. Ready to build your vision?", hook: "Learning the Art of Economy and high production value on a budget." }
        ] 
      },
      { 
        id: 3, 
        label: "Scene 03", 
        url: "https://github.com/rajatboss1/DebuTv_videostorange/releases/download/video/Episode3_Debu.mp4", 
        triggers: [
          { char: 'Debu', intro: "Your first film is your calling card to the world. Let’s make sure it’s elegant. What is your visual grammar?", hook: "Debu acts as a Creative Consultant for your first short film." }
        ] 
      }
    ]
  }
];

const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const SIGNATURE_GRADIENT = 'radial-gradient(circle at top left, #1e3a8a 0%, #020617 40%, #581c87 80%, #7e22ce 100%)';

const ReelItem: React.FC<{ 
  episode: any, 
  series: any,
  isActive: boolean,
  isMuted: boolean,
  toggleMute: () => void,
  onEnterStory: (char: string, intro: string, hook: string) => void,
  onNextEpisode: () => void
}> = ({ episode, series, isActive, isMuted, toggleMute, onEnterStory, onNextEpisode }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isActive) {
      setIsEnded(false);
      video.currentTime = 0;
      video.preload = "auto";
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
      video.preload = "none";
    }
  }, [isActive]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100 || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  return (
    <div className="reel-item flex items-center justify-center overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={episode.url}
        preload={isActive ? "auto" : "none"}
        className={`w-full h-full object-cover transition-all duration-1000 ${isEnded ? 'scale-105 blur-3xl opacity-40' : 'opacity-100'}`}
        playsInline
        muted={isMuted}
        onEnded={() => setIsEnded(true)}
        onLoadStart={() => setLoading(true)}
        onCanPlay={() => setLoading(false)}
        onTimeUpdate={handleTimeUpdate}
        onClick={() => videoRef.current?.paused ? videoRef.current.play() : videoRef.current?.pause()}
      />

      {loading && !isEnded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-white/10 border-t-white rounded-full animate-spin shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
            <p className="text-[9px] font-black tracking-[0.4em] uppercase text-white/40">Loading Scene...</p>
          </div>
        </div>
      )}

      {!isEnded && (
        <>
          <div className="absolute bottom-24 left-6 pointer-events-none z-50">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-[2px] w-6 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/90 drop-shadow-md">{episode.label}</span>
            </div>
            <p className="text-white text-xs font-medium opacity-60 max-w-[200px] leading-tight drop-shadow-lg">{series.reelHint || 'Roleplay with the characters to change their destiny'}</p>
          </div>

          <div className="absolute right-4 bottom-24 flex flex-col items-center gap-8 z-[100] pointer-events-auto">
            <button 
              onClick={(e) => { e.stopPropagation(); toggleMute(); }}
              className="flex flex-col items-center gap-1.5 active:scale-90 transition-all group mb-2"
            >
              <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white shadow-2xl transition-all group-hover:bg-white/10">
                {isMuted ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.535 7.465a.75.75 0 0 1 1.06 0L22.12 10l-2.525 2.525a.75.75 0 1 1-1.06-1.06L20 10l-1.465-1.465a.75.75 0 0 1 0-1.06Z" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06 4.25 4.25 0 0 1 0 6.01.75.75 0 0 0 1.06 1.06 5.75 5.75 0 0 0 0-8.13ZM21.03 5.97a.75.75 0 0 0-1.06 1.06 8.5 8.5 0 0 1 0 12.02.75.75 0 1 0 1.06 1.06 10 10 0 0 0 0-14.14Z" /></svg>
                )}
              </div>
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white">Mute</span>
            </button>

            {episode.triggers.map((t: any, idx: number) => (
              <button 
                key={idx}
                onClick={(e) => { e.stopPropagation(); onEnterStory(t.char, t.intro, t.hook); }}
                className="flex flex-col items-center gap-2 active:scale-95 transition-all group animate-slide-up-side"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="relative group">
                   <div className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity ${t.char === 'Priyank' ? 'bg-blue-500' : t.char === 'Arzoo' ? 'bg-pink-500' : 'bg-purple-500'}`} />
                   <CharacterDP 
                    src={series.avatars[t.char]} 
                    name={t.char} 
                    theme={t.char === 'Priyank' ? 'blue' : t.char === 'Arzoo' ? 'pink' : 'purple'} 
                   />
                </div>
                <div className={`px-2.5 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md shadow-xl group-hover:bg-white group-hover:border-white transition-all`}>
                  <span className="text-[6.5px] font-black uppercase tracking-[0.1em] text-white group-hover:text-black whitespace-nowrap">
                    CHAT WITH {t.char.toUpperCase()}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {isEnded && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center p-8 bg-black/60 backdrop-blur-3xl animate-fade-in pointer-events-auto">
           <div className="mb-2 h-0.5 w-12 bg-white/20 rounded-full" />
           <h3 className="text-4xl font-black italic uppercase text-white mb-2 tracking-tighter">Scene Cleared</h3>
           <p className="text-white/40 text-[10px] font-black tracking-[0.5em] uppercase mb-12">Pick your path</p>
           
           <div className="flex flex-col gap-5 mb-16 w-full max-w-[280px]">
             {episode.triggers.map((t: any, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => onEnterStory(t.char, t.intro, t.hook)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left group"
                >
                  <CharacterDP 
                    src={series.avatars[t.char]} 
                    name={t.char} 
                    theme={t.char === 'Priyank' ? 'blue' : t.char === 'Arzoo' ? 'pink' : 'purple'} 
                    size="w-12 h-12"
                  />
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">Roleplay with {t.char}</span>
                    <p className="text-[9px] text-white/40 font-bold uppercase tracking-tight">Active Room</p>
                  </div>
                </button>
             ))}
           </div>

           <button onClick={onNextEpisode} className="flex flex-col items-center gap-4 group">
             <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-90 transition-all group-hover:scale-110">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" /></svg>
             </div>
             <span className="text-[9px] font-black tracking-[0.4em] uppercase text-white/30 group-hover:text-white/80 transition-colors">Next Episode</span>
           </button>
        </div>
      )}

      {!isEnded && (
        <div className="absolute bottom-0 left-0 right-0 z-[70] pt-20 group/scrubber transition-all pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-24 pointer-events-none" />
          <div className={`relative px-6 pb-6 transition-all duration-300 ${isScrubbing ? 'translate-y-[-10px]' : 'translate-y-0'}`}>
            <div className="relative h-6 flex items-center">
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="0.1" 
                value={progress} 
                onChange={handleSeek} 
                onMouseDown={() => setIsScrubbing(true)}
                onMouseUp={() => setIsScrubbing(false)}
                onTouchStart={() => setIsScrubbing(true)}
                onTouchEnd={() => setIsScrubbing(false)}
                className="scrub-range w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer pointer-events-auto z-10" 
              />
              <div 
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 rounded-full transition-all duration-75 pointer-events-none ${isScrubbing ? 'shadow-[0_0_15px_#3b82f6]' : ''}`} 
                style={{ width: `${progress}%` }} 
              />
            </div>
            <div className={`mt-1.5 flex justify-between items-center transition-all duration-500 ${isScrubbing ? 'opacity-100' : 'opacity-40'}`}>
              <div className="text-[9px] font-black text-white tracking-[0.2em] uppercase tabular-nums">
                <span className="text-blue-400">{formatTime(currentTime)}</span> / {formatTime(duration)}
              </div>
              <div className="text-[8px] font-black text-white/40 tracking-[0.3em] uppercase">Inscene Rhythm Engine</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [selectedSeries, setSelectedSeries] = useState<any>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [chatData, setChatData] = useState<any>(null);

  useEffect(() => {
    if (selectedSeries) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setActiveIdx(index);
          }
        });
      }, { threshold: 0.6 });
      
      const timer = setTimeout(() => {
        document.querySelectorAll('.reel-item-wrapper').forEach(i => observer.observe(i));
      }, 200);
      
      return () => {
        clearTimeout(timer);
        observer.disconnect();
      };
    }
  }, [selectedSeries]);

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % selectedSeries.episodes.length;
    const nextEl = document.querySelector(`[data-index="${nextIdx}"]`);
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] h-[100dvh] text-white overflow-hidden" style={{ background: SIGNATURE_GRADIENT }}>
      <header className={`fixed top-0 left-0 right-0 z-[1000] px-6 py-6 flex justify-between items-center transition-all duration-500 ${selectedSeries ? 'bg-gradient-to-b from-black/80 to-transparent' : 'bg-transparent'}`}>
        <div className="flex items-center gap-3 cursor-pointer group active:scale-95 transition-transform" onClick={() => { setSelectedSeries(null); setChatData(null); }}>
          <Logo size={32} />
          <span className="text-xl font-black italic tracking-tighter uppercase group-hover:text-blue-400 transition-colors">In<span className="text-blue-400 group-hover:text-white">scene</span></span>
        </div>
        {selectedSeries && (
          <button onClick={() => setSelectedSeries(null)} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center active:scale-90 hover:bg-white/20 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </header>

      {!selectedSeries ? (
        <main className="flex-1 overflow-y-auto pt-24 pb-20 px-6 animate-slide-up hide-scrollbar">
          <div className="flex flex-col gap-10 max-w-lg mx-auto">
            <div className="px-2">
              <p className="text-[10px] font-black tracking-[0.5em] uppercase text-white/30 mb-2">Immersive Narrative Experience</p>
              <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">Your Choice<br/>Your Vibe</h1>
            </div>
            
            <div className="grid grid-cols-1 gap-10 pb-20">
              {SERIES_CATALOG.map(series => (
                <div 
                  key={series.id}
                  onClick={() => setSelectedSeries(series)}
                  className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 group cursor-pointer shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] transition-all hover:border-white/30 active:scale-95"
                >
                  <img src={series.thumbnail} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30 group-hover:border-white/50">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white ml-1"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-0.5 w-8 bg-blue-500 rounded-full" style={{ backgroundColor: series.accentColor }} />
                      <span className="text-[10px] font-black tracking-widest text-white/60 uppercase">Interactive Original</span>
                    </div>
                    <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-2">{series.title}</h2>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em]">{series.tagline}</p>
                  </div>
                </div>
              ))}

              {/* Blurred "More Coming Soon" Card */}
              <div 
                className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/5 shadow-2xl transition-all cursor-default"
              >
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white/20"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white/30 leading-none mb-4">Secret<br/>Project</h3>
                  <div className="px-4 py-2 rounded-full border border-white/5 bg-white/5">
                    <span className="text-[9px] font-black tracking-[0.4em] uppercase text-white/20">More coming soon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <div className="reel-snap-container fixed inset-0 z-[500] hide-scrollbar">
          {selectedSeries.episodes.map((ep: any, i: number) => (
            <div key={ep.id} data-index={i} className="reel-item-wrapper reel-item">
              <ReelItem 
                episode={ep} series={selectedSeries} 
                isActive={activeIdx === i} isMuted={isMuted} 
                toggleMute={() => setIsMuted(!isMuted)} 
                onEnterStory={(char, intro, hook) => setChatData({char, intro, hook})}
                onNextEpisode={handleNext}
              />
            </div>
          ))}
        </div>
      )}

      {chatData && selectedSeries && (
        <ChatPanel 
          character={chatData.char} 
          episodeLabel={selectedSeries.episodes[activeIdx].label}
          instantGreeting={chatData.intro}
          initialHook={chatData.hook}
          avatar={selectedSeries.avatars[chatData.char]}
          onClose={() => setChatData(null)}
        />
      )}

      <Analytics />

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes slideUpSide { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .animate-slide-up-side { animation: slideUpSide 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default App;