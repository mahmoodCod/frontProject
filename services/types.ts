// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// Pagination Types
export interface PaginationInfo {
  page: number;
  limit: number;
  totalPage: number;
  totalCategories: number;
}

export interface PaginatedResponse<T> {
  categories: T[];
  pagination: PaginationInfo;
}

// Category Types
export interface CategorySEO {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  images?: string;
  color?: string;
  parent?: string | null;
  order: number;
  isActive: boolean;
  showOnHomepage?: boolean;
  seo?: CategorySEO;
  productsCount: number;
  createdAt: string;
  updatedAt: string;
}

// Tree Category (with children)
export interface TreeCategory {
  _id: string;
  name: string;
  slug: string;
  children: TreeCategory[];
}

// Featured Category
export interface FeaturedCategory {
  _id: string;
  name: string;
  slug: string;
  images?: string;
  order: number;
}

// Root Category
export interface RootCategory {
  _id: string;
  name: string;
  slug: string;
  parent: null;
  order: number;
}

// Category Creation/Update Data
export interface CategoryFormData {
  name: string;
  slug: string;
  description?: string;
  images?: File;
  color?: string;
  parent?: string;
  order?: number;
  isActive?: boolean;
  showOnHomepage?: boolean;
  "seo.metaTitle"?: string;
  "seo.metaDescription"?: string;
  "seo.metaKeywords"?: string[];
}

// API Error Types
export interface ApiError {
  success: false;
  message: string;
  status?: number;
}

// Status Update Types
export interface StatusUpdateData {
  isActive: boolean;
}

export interface OrderUpdateData {
  order: number;
}

// Subcategories Response
export interface SubcategoriesResponse {
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  subcategories: Array<{
    _id: string;
    name: string;
    slug: string;
    parent: string;
    order: number;
    isActive: boolean;
  }>;
}

// Query Parameters
export interface CategoryListQuery {
  page?: number;
  limit?: number;
  isActive?: string;
  parent?: string;
}
