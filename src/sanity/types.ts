// Central location for all Sanity document types

export interface Product {
  _id: string;
  _type: 'product';
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  price: number;
  featured: boolean;
  description?: any; // Portable Text
  sku: string;
  quantity: number;
}

export interface Category {
  _id: string;
  _type: 'category';
  _createdAt: string;
  _updatedAt: string;
  name: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  description?: string;
}

// Add more types as you create more schemas
export interface Order {
  _id: string;
  _type: 'order';
  // ... order fields
}

// Helper type for GROQ queries
export type SanityDocument = Product | Category | Order;