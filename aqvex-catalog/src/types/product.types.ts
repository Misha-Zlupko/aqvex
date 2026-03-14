export interface ProductVolume {
  id: string;
  label: string;
  in_stock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  old_price: number | null;
  discount_percent: number | null;
  currency: string;
  rating: number;
  reviews_count: number;
  image: string;
  in_stock: boolean;
  category: string;
  volumes: ProductVolume[];
  selected_volume_id: string;
}
  
  // Якщо потрібен тип для відповіді з API
  export interface ProductsResponse {
    success: boolean;
    data: {
      products: Product[];
    };
  }
  
  // Для фільтрів (опціонально)
  export interface ProductFilters {
    search?: string;
    sortBy?: 'name' | 'price' | 'rating';
    sortOrder?: 'asc' | 'desc';
    priceRange?: { min: number; max: number };
    rating?: number | null;
  }