import type {
  ApiResponse,
  Category,
  TreeCategory,
  FeaturedCategory,
  RootCategory,
  CategoryFormData,
  StatusUpdateData,
  OrderUpdateData,
  SubcategoriesResponse,
  CategoryListQuery,
  PaginatedResponse,
} from './types';

// Base API URL - should come from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com';
const CATEGORY_API_BASE = `${API_BASE_URL}/api/v1/category`;

// Helper function to get auth token
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

// Helper function to create headers with auth
const createHeaders = (includeAuth: boolean = false, isFormData: boolean = false): HeadersInit => {
  const headers: HeadersInit = {};

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Helper function to handle API responses
const handleApiResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network error' }));
    return {
      success: false,
      message: errorData.message || `HTTP ${response.status}`,
    };
  }

  const data = await response.json();
  return data;
};

// Helper function to build query string
const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

// =======================
// PUBLIC ENDPOINTS
// =======================

/**
 * دریافت درخت دسته‌بندی‌ها (Public)
 */
export const getCategoryTree = async (): Promise<ApiResponse<{ categories: TreeCategory[]; message: string }>> => {
  try {
    const response = await fetch(`${CATEGORY_API_BASE}/tree`);
    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching category tree:', error);
    return {
      success: false,
      message: 'خطا در دریافت درخت دسته‌بندی‌ها',
    };
  }
};

/**
 * دریافت دسته‌بندی‌های ویژه (Public)
 */
export const getFeaturedCategories = async (): Promise<ApiResponse<{ categories: FeaturedCategory[]; message: string }>> => {
  try {
    const response = await fetch(`${CATEGORY_API_BASE}/featured`);
    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching featured categories:', error);
    return {
      success: false,
      message: 'خطا در دریافت دسته‌بندی‌های ویژه',
    };
  }
};

/**
 * دریافت دسته‌بندی‌های ریشه (Public)
 */
export const getRootCategories = async (): Promise<ApiResponse<{ categories: RootCategory[]; message: string }>> => {
  try {
    const response = await fetch(`${CATEGORY_API_BASE}/root`);
    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching root categories:', error);
    return {
      success: false,
      message: 'خطا در دریافت دسته‌بندی‌های ریشه',
    };
  }
};

/**
 * دریافت زیردسته‌بندی‌ها (Public)
 */
export const getSubcategories = async (categoryId: string): Promise<ApiResponse<SubcategoriesResponse>> => {
  try {
    const response = await fetch(`${CATEGORY_API_BASE}/${categoryId}/subcategories`);
    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    return {
      success: false,
      message: 'خطا در دریافت زیردسته‌بندی‌ها',
    };
  }
};

// =======================
// ADMIN ENDPOINTS
// =======================

/**
 * دریافت لیست دسته‌بندی‌ها (Admin Only)
 */
export const getCategories = async (query?: CategoryListQuery): Promise<ApiResponse<PaginatedResponse<Category>>> => {
  try {
    const queryString = query ? buildQueryString(query) : '';
    const response = await fetch(`${CATEGORY_API_BASE}${queryString}`, {
      headers: createHeaders(true),
    });
    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      success: false,
      message: 'خطا در دریافت لیست دسته‌بندی‌ها',
    };
  }
};

/**
 * ایجاد دسته‌بندی جدید (Admin Only)
 */
export const createCategory = async (formData: CategoryFormData): Promise<ApiResponse<{ category: Category; message: string }>> => {
  try {
    const requestData = new FormData();

    // Add all fields to FormData
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          requestData.append(key, value);
        } else if (Array.isArray(value)) {
          requestData.append(key, JSON.stringify(value));
        } else {
          requestData.append(key, String(value));
        }
      }
    });

    const response = await fetch(CATEGORY_API_BASE, {
      method: 'POST',
      headers: createHeaders(true, true), // No Content-Type for FormData
      body: requestData,
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error creating category:', error);
    return {
      success: false,
      message: 'خطا در ایجاد دسته‌بندی',
    };
  }
};

/**
 * به‌روزرسانی دسته‌بندی (Admin Only)
 */
export const updateCategory = async (
  categoryId: string,
  formData: Partial<CategoryFormData>
): Promise<ApiResponse<{ category: Category; message: string }>> => {
  try {
    const requestData = new FormData();

    // Add all fields to FormData
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          requestData.append(key, value);
        } else if (Array.isArray(value)) {
          requestData.append(key, JSON.stringify(value));
        } else {
          requestData.append(key, String(value));
        }
      }
    });

    const response = await fetch(`${CATEGORY_API_BASE}/${categoryId}`, {
      method: 'PUT',
      headers: createHeaders(true, true), // No Content-Type for FormData
      body: requestData,
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error updating category:', error);
    return {
      success: false,
      message: 'خطا در به‌روزرسانی دسته‌بندی',
    };
  }
};

/**
 * حذف دسته‌بندی (Admin Only)
 */
export const deleteCategory = async (categoryId: string): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await fetch(`${CATEGORY_API_BASE}/${categoryId}`, {
      method: 'DELETE',
      headers: createHeaders(true),
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error deleting category:', error);
    return {
      success: false,
      message: 'خطا در حذف دسته‌بندی',
    };
  }
};

/**
 * به‌روزرسانی وضعیت دسته‌بندی (Admin Only)
 */
export const updateCategoryStatus = async (
  categoryId: string,
  data: StatusUpdateData
): Promise<ApiResponse<{ category: Category; message: string }>> => {
  try {
    const response = await fetch(`${CATEGORY_API_BASE}/${categoryId}/status`, {
      method: 'PUT',
      headers: createHeaders(true),
      body: JSON.stringify(data),
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error updating category status:', error);
    return {
      success: false,
      message: 'خطا در به‌روزرسانی وضعیت دسته‌بندی',
    };
  }
};

/**
 * به‌روزرسانی ترتیب دسته‌بندی (Admin Only)
 */
export const updateCategoryOrder = async (
  categoryId: string,
  data: OrderUpdateData
): Promise<ApiResponse<{ category: Category; message: string }>> => {
  try {
    const response = await fetch(`${CATEGORY_API_BASE}/${categoryId}/order`, {
      method: 'PUT',
      headers: createHeaders(true),
      body: JSON.stringify(data),
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error updating category order:', error);
    return {
      success: false,
      message: 'خطا در به‌روزرسانی ترتیب دسته‌بندی',
    };
  }
};
