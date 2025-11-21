export enum PaintType {
  Base = 'Base',
  Layer = 'Layer',
  Shade = 'Shade',
  Contrast = 'Contrast',
  Dry = 'Dry',
  Technical = 'Technical',
  Spray = 'Spray'
}

export interface Paint {
  id: string;
  name: string;
  type: PaintType;
  hex: string; // Approximate hex color
  owned: boolean;
  wishlist: boolean;
}

export interface MatchedColor {
  colorName: string;
  citadelPaint: string;
  paintType: string;
  reasoning: string;
  hexEstimate: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}