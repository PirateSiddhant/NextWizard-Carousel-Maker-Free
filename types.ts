
export interface Slide {
  id: string;
  headline: string;
  body: string;
}

export interface Profile {
  name: string;
  handle: string;
  logoUrl?: string;
}

export interface CustomColors {
  color1: string;
  color2: string;
}

export type ThemeType = 
  | 'modern' | 'dark' | 'gradient' | 'minimal' | 'bold' | 'custom'
  | 'midnight_blue' | 'clean_tech' | 'deep_ocean' | 'arctic' | 'noir_blue'
  | 'summer_glow' | 'citrus_burst' | 'retro_orange' | 'golden_hour' | 'vibrant_yellow';

export interface CarouselConfig {
  theme: ThemeType;
  platform: 'linkedin' | 'instagram' | 'tiktok';
}
