
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Sparkles, Image as ImageIcon, Type, Palette, ChevronLeft, ChevronRight, Download, Wand2, Loader2, Plus, Trash2, User, Camera, X } from 'lucide-react';
import { toPng } from 'html-to-image';
import { Slide, ThemeType, CustomColors, Profile } from './types';
import { generateCarouselSlides } from './services/geminiService';
import CarouselSlide from './components/CarouselSlide';
import { THEMES } from './constants';

const DEFAULT_PROFILE: Profile = {
  name: "Jane Designer",
  handle: "@jane_creatives",
  logoUrl: ""
};

const DEFAULT_SLIDES: Slide[] = [
  { id: '1', headline: 'Master Social Media Carousels', body: 'Discover the secrets to creating high-converting visual content in minutes.' },
  { id: '2', headline: 'The Power of Storytelling', body: 'Each slide should lead the user to the next one through curiosity and value.' },
  { id: '3', headline: 'Visual Consistency', body: 'Maintain your brand identity using fonts, colors, and consistent profile markers.' }
];

export default function App() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES);
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [theme, setTheme] = useState<ThemeType>('modern');
  const [customColors, setCustomColors] = useState<CustomColors>({ color1: '#3b82f6', color2: '#9333ea' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const exportImage = async (index: number) => {
    const node = slideRefs.current[index];
    if (!node) return;
    
    try {
      const dataUrl = await toPng(node, { quality: 1, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `carousel-slide-${index + 1}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image', err);
    }
  };

  const exportAllImages = async () => {
    setIsExporting(true);
    for (let i = 0; i < slides.length; i++) {
      await exportImage(i);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    setIsExporting(false);
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    try {
      const newSlides = await generateCarouselSlides(topic);
      setSlides(newSlides);
      setCurrentIndex(0);
    } catch (error) {
      alert("Failed to generate slides. Please check your API key or topic.");
    } finally {
      setIsGenerating(false);
    }
  };

  const updateSlide = (id: string, field: 'headline' | 'body', value: string) => {
    setSlides(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addSlide = () => {
    const newSlide: Slide = {
      id: Math.random().toString(36).substr(2, 9),
      headline: 'New Slide Title',
      body: 'Add your amazing content here to engage your audience.'
    };
    setSlides([...slides, newSlide]);
    setCurrentIndex(slides.length);
  };

  const removeSlide = (id: string) => {
    if (slides.length <= 1) return;
    const indexToRemove = slides.findIndex(s => s.id === id);
    setSlides(slides.filter(s => s.id !== id));
    if (currentIndex >= indexToRemove) {
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, logoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-display font-extrabold tracking-tight text-slate-900">
            Next<span className="text-blue-600">Wizard</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={exportAllImages}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-900 rounded-lg font-semibold hover:bg-slate-200 transition-colors disabled:opacity-50"
          >
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
            <span className="hidden sm:inline">Export PNGs</span>
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-sm"
            onClick={() => window.print()}
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
      </header>

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Sidebar - Controls */}
        <aside className="lg:col-span-3 border-r border-slate-200 bg-white overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          {/* AI Generator Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Wand2 className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900">AI Generator</h2>
            </div>
            <div className="space-y-3">
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Topic: E.g., 5 Productivity Hacks for Developers..."
                className="w-full h-24 p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none text-sm outline-none text-slate-900 font-medium"
              />
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !topic}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Slides
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Slide Branding */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900">Slide Branding</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative group w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200 cursor-pointer overflow-hidden">
                  {profile.logoUrl ? (
                    <img src={profile.logoUrl} className="w-full h-full object-contain p-1" />
                  ) : (
                    <Camera className="text-slate-400 w-5 h-5" />
                  )}
                  <input type="file" onChange={handleLogoUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                  {profile.logoUrl && (
                    <button 
                      onClick={(e) => { e.preventDefault(); setProfile({...profile, logoUrl: ""}); }}
                      className="absolute top-0 right-0 p-0.5 bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
                <div className="flex-grow">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Logo</p>
                  <p className="text-[10px] text-slate-400 leading-none">Upload brand icon</p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Author Name</label>
                <input 
                  type="text" 
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-100 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none text-sm font-semibold"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Social Handle</label>
                <input 
                  type="text" 
                  value={profile.handle}
                  onChange={(e) => setProfile({ ...profile, handle: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-100 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none text-xs text-slate-500"
                  placeholder="@handle"
                />
              </div>
            </div>
          </section>

          {/* Theme Selector */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900">Visual Style</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {(Object.keys(THEMES) as ThemeType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-3 py-2 rounded-lg text-[10px] font-bold capitalize border-2 transition-all ${
                    theme === t ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'border-slate-100 hover:border-slate-200 text-slate-600'
                  }`}
                >
                  {t.replace('_', ' ')}
                </button>
              ))}
            </div>
            
            {theme === 'custom' && (
              <div className="p-4 bg-slate-50 rounded-xl space-y-3 border border-slate-200">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Custom Gradient</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={customColors.color1} 
                      onChange={(e) => setCustomColors(prev => ({ ...prev, color1: e.target.value }))}
                      className="w-10 h-10 rounded cursor-pointer border-none bg-transparent"
                    />
                    <span className="text-[10px] font-mono text-slate-400">{customColors.color1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={customColors.color2} 
                      onChange={(e) => setCustomColors(prev => ({ ...prev, color2: e.target.value }))}
                      className="w-10 h-10 rounded cursor-pointer border-none bg-transparent"
                    />
                    <span className="text-[10px] font-mono text-slate-400">{customColors.color2}</span>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Slide Editor List */}
          <section>
             <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Type className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold text-slate-900">Slide Content ({slides.length})</h2>
              </div>
              <button 
                onClick={addSlide}
                className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {slides.map((s, idx) => (
                <div 
                  key={s.id} 
                  onClick={() => setCurrentIndex(idx)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${currentIndex === idx ? 'border-blue-400 bg-blue-50/50 shadow-sm' : 'border-slate-50 bg-slate-50/50 hover:border-slate-200'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Slide {idx + 1}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeSlide(s.id); }} 
                      className="text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input 
                    value={s.headline}
                    onChange={(e) => updateSlide(s.id, 'headline', e.target.value)}
                    className="w-full bg-transparent font-bold text-slate-800 text-sm mb-1 outline-none"
                    placeholder="Headline"
                  />
                  <textarea 
                    value={s.body}
                    onChange={(e) => updateSlide(s.id, 'body', e.target.value)}
                    className="w-full bg-transparent text-slate-600 text-xs h-16 resize-none outline-none"
                    placeholder="Slide body text..."
                  />
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* Main Preview Area */}
        <section className="lg:col-span-9 p-8 flex flex-col items-center justify-center bg-slate-100/50 relative overflow-x-hidden">
          <div className="max-w-3xl w-full">
            {/* Visual Preview Container */}
            <div className="relative group">
              <div className="flex justify-center items-center gap-8 overflow-hidden rounded-2xl shadow-2xl bg-white p-4">
                <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentIndex * 100}%)`, width: '100%' }}>
                  {slides.map((slide, idx) => (
                    <div key={slide.id} className="w-full flex-shrink-0 flex justify-center p-4">
                      <CarouselSlide
                        innerRef={(el) => { slideRefs.current[idx] = el; }}
                        slide={slide}
                        profile={profile}
                        theme={theme}
                        customColors={customColors}
                        index={idx}
                        total={slides.length}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 shadow-lg text-slate-800 disabled:opacity-0 hover:bg-white transition-all z-20 border border-slate-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setCurrentIndex(prev => Math.min(slides.length - 1, prev + 1))}
                disabled={currentIndex === slides.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 shadow-lg text-slate-800 disabled:opacity-0 hover:bg-white transition-all z-20 border border-slate-100"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Pagination Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    currentIndex === idx ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            {/* Quick Export Current Button */}
            <div className="mt-8 flex justify-center">
              <button 
                onClick={() => exportImage(currentIndex)}
                className="text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download Current Slide (1:1 PNG)
              </button>
            </div>

            {/* Platform Previews Info */}
            <div className="mt-12 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900">Platform Optimized</h3>
                <p className="text-sm text-slate-500">Perfectly sized for LinkedIn, Instagram & TikTok carousels.</p>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-[10px] font-black">LI</div>
                  <span className="text-[10px] mt-1 text-slate-400">1080px</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-[10px] font-black">IG</div>
                  <span className="text-[10px] mt-1 text-slate-400">1:1</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-[10px] font-black">TT</div>
                  <span className="text-[10px] mt-1 text-slate-400">Posts</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Hidden container for printing */}
      <div className="hidden print:block bg-white p-0">
        {slides.map((slide, idx) => (
          <div key={`print-${slide.id}`} className="page-break-after-always mb-8 flex justify-center">
             <CarouselSlide
              slide={slide}
              profile={profile}
              theme={theme}
              customColors={customColors}
              index={idx}
              total={slides.length}
            />
          </div>
        ))}
      </div>

      <style>{`
        @media print {
          body { visibility: hidden; background: white; }
          .print\\:block { visibility: visible; position: absolute; left: 0; top: 0; width: 100%; }
          .page-break-after-always { page-break-after: always; }
          header, aside, main { display: none !important; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
}
