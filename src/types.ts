export type ProductCategory =
  | 'all'
  | 'cement'
  | 'paint'
  | 'roofing'
  | 'iron-rods'
  | 'nails-wire'
  | 'sand-chippings'
  | 'timber'
  | 'tools-equipment'
  | 'plumbing'
  | 'electrical'
  | 'doors-windows'
  | 'water-supply'
  | 'provision-barber';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  description: string;
  unit: string;
  priceGhs?: number;
  inStock: boolean;
  featured?: boolean;
  isSmartPaint?: boolean;
  badge?: string;
  specs: string[];
  imageUrl?: string;
  imagePlaceholderColor?: string;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  customNotes?: string;
}

export interface SmartPaintPreset {
  id: string;
  name: string;
  hex: string;
  family: 'warm' | 'cool' | 'neutral' | 'accent';
  popularFor: string;
  finishRecommended: string;
}

export interface PaintCalculationResult {
  areaSqMeters: number;
  coats: number;
  litersRequired: number;
  buckets20L: number;
  gallons4L: number;
  primerBuckets20L: number;
}

export interface ConcreteCalculationResult {
  volumeCubicMeters: number;
  cementBags: number;
  sandTons: number;
  chippingsTons: number;
  waterLiters: number;
  ironRodLengths12mm: number;
}

export interface WallCalculationResult {
  wallAreaSqMeters: number;
  blocksCount: number;
  cementBagsForMortar: number;
  sandTonsForMortar: number;
  cementBagsForPlaster: number;
  sandTonsForPlaster: number;
}

export interface RoofingCalculationResult {
  roofAreaSqMeters: number;
  sheetCount: number;
  ridgeCapPieces: number;
  roofingNailBoxes: number;
}
