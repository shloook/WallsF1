export interface Wallpaper {
  id: string;
  url: string;
  title: string;
  author?: string;
  isGenerated?: boolean;
  prompt?: string;
}

export type Tab = 'explore' | 'generate' | 'saved';

export interface GenerationConfig {
  prompt: string;
  aspectRatio: '1:1' | '3:4' | '4:3' | '9:16' | '16:9';
}
