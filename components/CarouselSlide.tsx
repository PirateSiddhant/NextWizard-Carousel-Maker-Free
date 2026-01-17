
import React from 'react';
import { Slide, ThemeType, CustomColors, Profile } from '../types';
import { THEMES } from '../constants';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface CarouselSlideProps {
  slide: Slide;
  profile: Profile;
  theme: ThemeType;
  customColors: CustomColors;
  index: number;
  total: number;
  innerRef?: React.Ref<HTMLDivElement>;
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({ slide, profile, theme, customColors, index, total, innerRef }) => {
  const styles = THEMES[theme];

  const containerStyle = theme === 'custom' 
    ? { background: `linear-gradient(135deg, ${customColors.color1}, ${customColors.color2})` }
    : {};

  const isLast = index === total - 1;

  return (
    <div 
      ref={innerRef}
      style={containerStyle}
      className={`aspect-square w-full max-w-[500px] flex-shrink-0 flex flex-col p-10 relative overflow-hidden transition-all duration-300 ${styles.container}`}
    >
      {/* Slide Header Section */}
      <div className="flex justify-between items-start mb-4 z-10">
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${styles.accent} ${
          ['gradient', 'dark', 'bold', 'custom', 'midnight_blue', 'deep_ocean', 'noir_blue', 'citrus_burst', 'retro_orange', 'golden_hour'].includes(theme) 
          ? 'text-black' 
          : 'text-white'
        }`}>
          {index + 1} / {total}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col justify-center z-10 relative">
        <h2 className={`text-4xl md:text-5xl leading-[1.15] mb-6 font-display ${styles.headline}`}>
          {slide.headline}
        </h2>
        <div className={`w-12 h-1 mb-6 rounded-full opacity-50 ${styles.accent}`}></div>
        <p className={`text-xl leading-relaxed ${styles.body} font-medium`}>
          {slide.body}
        </p>
      </div>

      {/* Connecting Arrow (Visual Flow) */}
      {!isLast && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20">
          <div className={`p-4 rounded-full shadow-2xl backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center transition-transform hover:scale-110`}>
            <ArrowRight className={`w-8 h-8 ${styles.profileText}`} />
          </div>
        </div>
      )}

      {/* Footer Branding Section */}
      <div className="flex justify-between items-center mt-10 z-10 pt-6 border-t border-current/10">
        <div className="flex items-center gap-3">
          {profile.logoUrl && (
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-white shadow-sm flex items-center justify-center p-1.5 border border-slate-100">
              <img src={profile.logoUrl} className="w-full h-full object-contain" alt="Brand Logo" />
            </div>
          )}
          <div className="flex flex-col">
            <h4 className={`text-sm font-bold leading-none mb-1 ${styles.profileText}`}>{profile.name}</h4>
            <p className={`text-[10px] opacity-70 font-bold uppercase tracking-wider ${styles.profileText}`}>{profile.handle}</p>
          </div>
        </div>

        {!isLast && (
          <div className={`flex items-center gap-2 group ${styles.profileText} opacity-80 font-black italic`}>
            <span className="text-[11px] uppercase tracking-widest">Keep Swiping</span>
            <ChevronRight className="w-5 h-5 animate-bounce-x" />
          </div>
        )}
      </div>

      {/* Decorative Background Elements */}
      {theme === 'modern' && (
        <>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50" />
        </>
      )}
      {theme === 'midnight_blue' && (
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-400/5 rounded-full blur-2xl" />
      )}
      {theme === 'vibrant_yellow' && (
        <div className="absolute -bottom-6 -left-6 w-32 h-32 border-[12px] border-black opacity-5 rotate-12" />
      )}
      {theme === 'custom' && (
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      )}

      <style>{`
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default CarouselSlide;
