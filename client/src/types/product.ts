export interface ColorVariant {
  id: string;
  name: string;
  image: string; // Main preview image URL
  thumbnail: string; // Color selector thumbnail URL
  price: number; // Current price
  originalPrice?: number; // Pre-discount price
}

export interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  learnMoreUrl?: string;
  variants: ColorVariant[];
  defaultVariantId?: string;
  discountBadge?: string;
  onSelectionChange?: (selection: Selection) => void;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  learnMoreUrl?: string;
  discountBadge?: string;
  variants: ColorVariant[];
}

export interface Selection {
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
  originalPrice?: number;
  name: string;
  colorName: string;
  image: string;
}
