"use client";

import { useState, useEffect, useCallback } from 'react';
import type {
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
  ApiResponse,
} from './types';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryTree,
  getFeaturedCategories,
  getRootCategories,
  getSubcategories,
  updateCategoryStatus,
  updateCategoryOrder,
} from './categoryApi';

// =======================
// PUBLIC HOOKS
// =======================

/**
 * Hook for fetching category tree
 */
export const useCategoryTree = () => {
  const [data, setData] = useState<TreeCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTree = useCallback(async () => {
    setLoading(true);
    setError(null);

    const result = await getCategoryTree();

    if (result.success && result.data) {
      setData(result.data.categories);
    } else {
      setError(result.message || 'خطا در دریافت درخت دسته‌بندی‌ها');
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTree();
  }, [fetchTree]);

  return {
    categories: data,
    loading,
    error,
    refetch: fetchTree,
  };
};

/**
 * Hook for fetching featured categories
 */
export const useFeaturedCategories = () => {
  const [data, setData] = useState<FeaturedCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeatured = useCallback(async () => {
    setLoading(true);
    setError(null);

    const result = await getFeaturedCategories();

    if (result.success && result.data) {
      setData(result.data.categories);
    } else {
      setError(result.message || 'خطا در دریافت دسته‌بندی‌های ویژه');
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFeatured();
  }, [fetchFeatured]);

  return {
    categories: data,
    loading,
    error,
    refetch: fetchFeatured,
  };
};

/**
 * Hook for fetching root categories
 */
export const useRootCategories = () => {
  const [data, setData] = useState<RootCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoot = useCallback(async () => {
    setLoading(true);
    setError(null);

    const result = await getRootCategories();

    if (result.success && result.data) {
      setData(result.data.categories);
    } else {
      setError(result.message || 'خطا در دریافت دسته‌بندی‌های ریشه');
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRoot();
  }, [fetchRoot]);

  return {
    categories: data,
    loading,
    error,
    refetch: fetchRoot,
  };
};

/**
 * Hook for fetching subcategories
 */
export const useSubcategories = (categoryId: string | null) => {
  const [data, setData] = useState<SubcategoriesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubcategories = useCallback(async () => {
    if (!categoryId) return;

    setLoading(true);
    setError(null);

    const result = await getSubcategories(categoryId);

    if (result.success && result.data) {
      setData(result.data);
    } else {
      setError(result.message || 'خطا در دریافت زیردسته‌بندی‌ها');
    }

    setLoading(false);
  }, [categoryId]);

  useEffect(() => {
    fetchSubcategories();
  }, [fetchSubcategories]);

  return {
    data,
    loading,
    error,
    refetch: fetchSubcategories,
  };
};

// =======================
// ADMIN HOOKS
// =======================

/**
 * Hook for fetching categories list (Admin)
 */
export const useCategories = (query?: CategoryListQuery) => {
  const [data, setData] = useState<PaginatedResponse<Category> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    const result = await getCategories(query);

    if (result.success && result.data) {
      setData(result.data);
    } else {
      setError(result.message || 'خطا در دریافت لیست دسته‌بندی‌ها');
    }

    setLoading(false);
  }, [query]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    data,
    loading,
    error,
    refetch: fetchCategories,
  };
};

/**
 * Hook for category CRUD operations (Admin)
 */
export const useCategoryMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (formData: CategoryFormData) => {
    setLoading(true);
    setError(null);

    const result = await createCategory(formData);

    setLoading(false);

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      setError(result.message || 'خطا در ایجاد دسته‌بندی');
      return { success: false, error: result.message };
    }
  }, []);

  const update = useCallback(async (categoryId: string, formData: Partial<CategoryFormData>) => {
    setLoading(true);
    setError(null);

    const result = await updateCategory(categoryId, formData);

    setLoading(false);

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      setError(result.message || 'خطا در به‌روزرسانی دسته‌بندی');
      return { success: false, error: result.message };
    }
  }, []);

  const remove = useCallback(async (categoryId: string) => {
    setLoading(true);
    setError(null);

    const result = await deleteCategory(categoryId);

    setLoading(false);

    if (result.success) {
      return { success: true };
    } else {
      setError(result.message || 'خطا در حذف دسته‌بندی');
      return { success: false, error: result.message };
    }
  }, []);

  const updateStatus = useCallback(async (categoryId: string, data: StatusUpdateData) => {
    setLoading(true);
    setError(null);

    const result = await updateCategoryStatus(categoryId, data);

    setLoading(false);

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      setError(result.message || 'خطا در به‌روزرسانی وضعیت دسته‌بندی');
      return { success: false, error: result.message };
    }
  }, []);

  const updateOrder = useCallback(async (categoryId: string, data: OrderUpdateData) => {
    setLoading(true);
    setError(null);

    const result = await updateCategoryOrder(categoryId, data);

    setLoading(false);

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      setError(result.message || 'خطا در به‌روزرسانی ترتیب دسته‌بندی');
      return { success: false, error: result.message };
    }
  }, []);

  return {
    loading,
    error,
    create,
    update,
    remove,
    updateStatus,
    updateOrder,
  };
};

// =======================
// UTILITY HOOKS
// =======================

/**
 * Hook for category form state management
 */
export const useCategoryForm = (initialData?: Partial<CategoryFormData>) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    slug: '',
    description: '',
    color: '',
    parent: '',
    order: 0,
    isActive: true,
    showOnHomepage: false,
    "seo.metaTitle": '',
    "seo.metaDescription": '',
    "seo.metaKeywords": [],
    ...initialData,
  });

  const updateField = useCallback((field: keyof CategoryFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const updateSEOField = useCallback((field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [`seo.${field}`]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      color: '',
      parent: '',
      order: 0,
      isActive: true,
      showOnHomepage: false,
      "seo.metaTitle": '',
      "seo.metaDescription": '',
      "seo.metaKeywords": [],
    });
  }, []);

  return {
    formData,
    updateField,
    updateSEOField,
    resetForm,
    setFormData,
  };
};
