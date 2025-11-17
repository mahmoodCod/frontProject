"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiChevronDown,
  FiChevronUp,
  FiSave,
  FiX,
  FiUpload,
  FiAlertTriangle,
  FiCheck,
  FiLoader,
} from "react-icons/fi";
import {
  useCategories,
  useCategoryMutation,
  useCategoryForm,
  Category,
  CategoryFormData,
} from "@/services";
import { useAuth } from "@/contaxt/AuthContext";

interface CategoryManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoryManager({ isOpen, onClose }: CategoryManagerProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // API hooks
  const { data: categoriesData, loading: listLoading, error: listError, refetch } = useCategories();
  const { loading: mutationLoading, create, update, remove, updateStatus, updateOrder } = useCategoryMutation();

  // Form hook
  const { formData, updateField, updateSEOField, resetForm, setFormData } = useCategoryForm();

  // Check if user is admin
  const isAdmin = user?.roles?.includes('ADMIN');

  useEffect(() => {
    if (!isAdmin && isOpen) {
      onClose();
    }
  }, [isAdmin, isOpen, onClose]);

  // Reset form when switching tabs
  useEffect(() => {
    if (activeTab === 'create') {
      resetForm();
    } else if (activeTab === 'edit' && selectedCategory) {
      setFormData({
        name: selectedCategory.name,
        slug: selectedCategory.slug,
        description: selectedCategory.description || '',
        color: selectedCategory.color || '',
        parent: selectedCategory.parent || '',
        order: selectedCategory.order,
        isActive: selectedCategory.isActive,
        showOnHomepage: selectedCategory.showOnHomepage || false,
        "seo.metaTitle": selectedCategory.seo?.metaTitle || '',
        "seo.metaDescription": selectedCategory.seo?.metaDescription || '',
        "seo.metaKeywords": selectedCategory.seo?.metaKeywords || [],
      });
    }
  }, [activeTab, selectedCategory, resetForm, setFormData]);

  const handleCreate = async () => {
    const result = await create(formData);
    if (result.success) {
      setActiveTab('list');
      resetForm();
      refetch();
    }
  };

  const handleUpdate = async () => {
    if (!selectedCategory) return;

    const result = await update(selectedCategory._id, formData);
    if (result.success) {
      setActiveTab('list');
      setSelectedCategory(null);
      resetForm();
      refetch();
    }
  };

  const handleDelete = async (categoryId: string) => {
    const result = await remove(categoryId);
    if (result.success) {
      setShowDeleteConfirm(null);
      refetch();
    }
  };

  const handleStatusToggle = async (categoryId: string, currentStatus: boolean) => {
    await updateStatus(categoryId, { isActive: !currentStatus });
    refetch();
  };

  const handleOrderChange = async (categoryId: string, newOrder: number) => {
    await updateOrder(categoryId, { order: newOrder });
    refetch();
  };

  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR');
  };

  const renderCategoryTree = (categories: Category[], level = 0) => {
    return categories.map((category) => {
      const hasChildren = categories.some(cat => cat.parent === category._id);
      const isExpanded = expandedCategories.has(category._id);

      return (
        <div key={category._id}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center justify-between p-4 border-b border-amber-100 hover:bg-amber-50/50 transition-colors ${
              level > 0 ? 'mr-6 border-r-2 border-r-amber-200' : ''
            }`}
            style={{ marginRight: level * 24 }}
          >
            <div className="flex items-center gap-3 flex-1">
              {hasChildren && (
                <button
                  onClick={() => toggleCategoryExpansion(category._id)}
                  className="p-1 hover:bg-amber-100 rounded"
                >
                  {isExpanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                </button>
              )}
              {!hasChildren && <div className="w-8" />}

              <div className="flex items-center gap-3">
                {category.color && (
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: category.color }}
                  />
                )}
                <div>
                  <h3 className="font-semibold text-gray-800">{category.name}</h3>
                  <p className="text-sm text-gray-500">/{category.slug}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {category.productsCount} محصول
              </span>

              <button
                onClick={() => handleStatusToggle(category._id, category.isActive)}
                className={`p-2 rounded-lg transition-colors ${
                  category.isActive
                    ? 'text-green-600 hover:bg-green-50'
                    : 'text-gray-400 hover:bg-gray-50'
                }`}
              >
                {category.isActive ? <FiEye size={16} /> : <FiEyeOff size={16} />}
              </button>

              <button
                onClick={() => {
                  setSelectedCategory(category);
                  setActiveTab('edit');
                }}
                className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
              >
                <FiEdit3 size={16} />
              </button>

              <button
                onClick={() => setShowDeleteConfirm(category._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </motion.div>

          {hasChildren && isExpanded && (
            <div>
              {renderCategoryTree(
                categories.filter(cat => cat.parent === category._id),
                level + 1
              )}
            </div>
          )}
        </div>
      );
    });
  };

  const renderForm = () => {
    const isEditing = activeTab === 'edit';

    return (
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl p-6 border border-amber-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">اطلاعات پایه</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نام دسته‌بندی *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="مثال: قهوه اسپرسو"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug (URL) *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => updateField('slug', e.target.value)}
                className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono text-sm"
                placeholder="espresso-coffee"
                dir="ltr"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              توضیحات
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="توضیحات دسته‌بندی..."
            />
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-white rounded-xl p-6 border border-amber-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">تنظیمات نمایش</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رنگ دسته‌بندی
              </label>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => updateField('color', e.target.value)}
                className="w-full h-10 border border-amber-200 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ترتیب نمایش
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => updateField('order', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                دسته‌بندی والد
              </label>
              <select
                value={formData.parent}
                onChange={(e) => updateField('parent', e.target.value)}
                className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="">دسته‌بندی ریشه</option>
                {categoriesData?.categories
                  .filter(cat => cat._id !== selectedCategory?._id)
                  .map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => updateField('isActive', e.target.checked)}
                className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-700">فعال</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.showOnHomepage}
                onChange={(e) => updateField('showOnHomepage', e.target.checked)}
                className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-700">نمایش در صفحه اصلی</span>
            </label>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-white rounded-xl p-6 border border-amber-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">تنظیمات SEO</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                عنوان SEO (Meta Title)
              </label>
              <input
                type="text"
                value={formData["seo.metaTitle"]}
                onChange={(e) => updateSEOField('metaTitle', e.target.value)}
                className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="عنوان برای موتورهای جستجو"
                maxLength={70}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData["seo.metaTitle"]?.length || 0}/70 کاراکتر
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                توضیحات SEO (Meta Description)
              </label>
              <textarea
                value={formData["seo.metaDescription"]}
                onChange={(e) => updateSEOField('metaDescription', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="توضیحات برای موتورهای جستجو"
                maxLength={160}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData["seo.metaDescription"]?.length || 0}/160 کاراکتر
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                کلمات کلیدی SEO
              </label>
              <input
                type="text"
                value={formData["seo.metaKeywords"]?.join(', ') || ''}
                onChange={(e) => updateSEOField('metaKeywords', e.target.value.split(',').map(k => k.trim()))}
                className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="قهوه, اسپرسو, قهوه تازه"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            onClick={() => {
              setActiveTab('list');
              setSelectedCategory(null);
              resetForm();
            }}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            انصراف
          </button>

          <button
            onClick={isEditing ? handleUpdate : handleCreate}
            disabled={mutationLoading}
            className="flex items-center gap-2 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutationLoading ? (
              <FiLoader className="animate-spin" size={16} />
            ) : (
              <FiSave size={16} />
            )}
            {isEditing ? 'به‌روزرسانی' : 'ایجاد'}
          </button>
        </div>
      </div>
    );
  };

  // Note: Admin role checking is now handled by AdminAccessChecker in parent component

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-4 md:inset-8 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">مدیریت دسته‌بندی‌ها</h2>
                <p className="text-gray-600 mt-1">مدیریت کامل دسته‌بندی‌های محصول</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('create')}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                >
                  <FiPlus size={16} />
                  دسته‌بندی جدید
                </button>

                <button
                  onClick={onClose}
                  className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-amber-200 bg-gray-50">
              {[
                { key: 'list', label: 'لیست دسته‌بندی‌ها', icon: FiEye },
                { key: 'create', label: 'ایجاد دسته‌بندی', icon: FiPlus },
                ...(activeTab === 'edit' ? [{ key: 'edit', label: 'ویرایش دسته‌بندی', icon: FiEdit3 }] : []),
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center gap-2 px-6 py-3 transition-colors ${
                    activeTab === tab.key
                      ? 'border-b-2 border-amber-600 text-amber-700 bg-white'
                      : 'text-gray-600 hover:text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'list' && (
                <div>
                  {listLoading ? (
                    <div className="text-center py-12">
                      <FiLoader className="animate-spin mx-auto text-amber-600" size={32} />
                      <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
                    </div>
                  ) : listError ? (
                    <div className="text-center py-12">
                      <FiAlertTriangle className="mx-auto text-red-600" size={32} />
                      <p className="mt-4 text-red-600">{listError}</p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl border border-amber-200 overflow-hidden">
                      {categoriesData?.categories.length === 0 ? (
                        <div className="text-center py-12">
                          <p className="text-gray-600">هیچ دسته‌بندی‌ای یافت نشد</p>
                        </div>
                      ) : (
                        renderCategoryTree(categoriesData?.categories.filter(cat => !cat.parent) || [])
                      )}
                    </div>
                  )}
                </div>
              )}

              {(activeTab === 'create' || activeTab === 'edit') && renderForm()}
            </div>
          </motion.div>

          {/* Delete Confirmation Modal */}
          <AnimatePresence>
            {showDeleteConfirm && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-0 flex items-center justify-center z-[60] p-4"
              >
                <div className="bg-white rounded-xl p-6 shadow-2xl border border-amber-200 max-w-md w-full">
                  <div className="flex items-center gap-3 mb-4">
                    <FiAlertTriangle className="text-red-600" size={24} />
                    <h3 className="text-lg font-semibold text-gray-800">تأیید حذف</h3>
                  </div>

                  <p className="text-gray-600 mb-6">
                    آیا مطمئن هستید که می‌خواهید این دسته‌بندی را حذف کنید؟ این عمل قابل برگشت نیست.
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowDeleteConfirm(null)}
                      className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      انصراف
                    </button>

                    <button
                      onClick={() => handleDelete(showDeleteConfirm)}
                      disabled={mutationLoading}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
                    >
                      {mutationLoading ? 'در حال حذف...' : 'حذف'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
