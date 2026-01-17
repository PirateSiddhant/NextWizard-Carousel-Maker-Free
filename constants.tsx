
import React from 'react';
import { ThemeType } from './types';

export const THEMES: Record<ThemeType, {
  container: string;
  headline: string;
  body: string;
  accent: string;
  profileText: string;
}> = {
  modern: {
    container: 'bg-white border border-slate-200',
    headline: 'text-slate-900 font-extrabold',
    body: 'text-slate-600',
    accent: 'bg-blue-600',
    profileText: 'text-slate-900'
  },
  dark: {
    container: 'bg-slate-950 border border-slate-800',
    headline: 'text-white font-extrabold',
    body: 'text-slate-400',
    accent: 'bg-emerald-500',
    profileText: 'text-white'
  },
  gradient: {
    container: 'bg-gradient-to-br from-indigo-600 to-purple-700',
    headline: 'text-white font-extrabold shadow-sm',
    body: 'text-indigo-100',
    accent: 'bg-white',
    profileText: 'text-white'
  },
  minimal: {
    container: 'bg-slate-50 border-l-4 border-slate-900',
    headline: 'text-slate-900 font-bold',
    body: 'text-slate-700',
    accent: 'bg-slate-900',
    profileText: 'text-slate-900'
  },
  bold: {
    container: 'bg-yellow-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]',
    headline: 'text-black font-black uppercase italic',
    body: 'text-black font-medium',
    accent: 'bg-black',
    profileText: 'text-black'
  },
  custom: {
    container: '', // Handled dynamically in component
    headline: 'text-white font-extrabold drop-shadow-md',
    body: 'text-white opacity-90',
    accent: 'bg-white',
    profileText: 'text-white'
  },
  // Blue/Black/White Themes
  midnight_blue: {
    container: 'bg-slate-900 border-t-8 border-blue-500',
    headline: 'text-white font-black',
    body: 'text-slate-300',
    accent: 'bg-blue-500',
    profileText: 'text-blue-400'
  },
  clean_tech: {
    container: 'bg-white border-b-8 border-slate-900',
    headline: 'text-slate-900 font-extrabold tracking-tight',
    body: 'text-slate-500 leading-snug',
    accent: 'bg-slate-900',
    profileText: 'text-slate-900'
  },
  deep_ocean: {
    container: 'bg-gradient-to-b from-slate-900 to-blue-900',
    headline: 'text-white font-bold italic',
    body: 'text-blue-100/80',
    accent: 'bg-cyan-400',
    profileText: 'text-white'
  },
  arctic: {
    container: 'bg-slate-50 border border-blue-100',
    headline: 'text-blue-900 font-extrabold',
    body: 'text-slate-500',
    accent: 'bg-blue-200',
    profileText: 'text-blue-800'
  },
  noir_blue: {
    container: 'bg-black border-r-8 border-blue-700',
    headline: 'text-white font-black uppercase',
    body: 'text-slate-400',
    accent: 'bg-blue-700',
    profileText: 'text-blue-500'
  },
  // Orange/Yellowish Themes
  summer_glow: {
    container: 'bg-orange-50 border border-orange-200',
    headline: 'text-orange-950 font-black',
    body: 'text-orange-800/80',
    accent: 'bg-orange-500',
    profileText: 'text-orange-900'
  },
  citrus_burst: {
    container: 'bg-gradient-to-tr from-yellow-400 to-orange-500',
    headline: 'text-white font-extrabold drop-shadow-sm',
    body: 'text-orange-50',
    accent: 'bg-white',
    profileText: 'text-white'
  },
  retro_orange: {
    container: 'bg-orange-600',
    headline: 'text-white font-black tracking-tighter',
    body: 'text-orange-100',
    accent: 'bg-yellow-400',
    profileText: 'text-yellow-200'
  },
  golden_hour: {
    container: 'bg-slate-900 border-l-8 border-yellow-500',
    headline: 'text-yellow-500 font-black',
    body: 'text-slate-400',
    accent: 'bg-yellow-500',
    profileText: 'text-white'
  },
  vibrant_yellow: {
    container: 'bg-yellow-300',
    headline: 'text-black font-extrabold uppercase',
    body: 'text-black/70 font-semibold',
    accent: 'bg-black',
    profileText: 'text-black'
  }
};
