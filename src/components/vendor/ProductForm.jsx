'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Upload, 
  X, 
  Plus, 
  Save,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export default function ProductForm({ initialData = {}, onSubmit, isEditing = false }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    price: initialData.price || '',
    category: initialData.category || '',
    subcategory: initialData.subcategory || '',
    sku: initialData.sku || '',
    stock: initialData.stock || '',
    images: initialData.images || [],
    certifications: initialData.certifications || [],
    ingredients: initialData.ingredients || '',
    nutritionalInfo: initialData.nutritionalInfo || '',
    origin: initialData.origin || '',
    shelfLife: initialData.shelfLife || '',
    storageInstructions: initialData.storageInstructions || '',
    isHalal: initialData.isHalal !== undefined ? initialData.isHalal : true,
    isOrganic: initialData.isOrganic || false,
    isVegan: initialData.isVegan || false,
    tags: initialData.tags || []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newTag, setNewTag] = useState('');
  
  const categories = [
    'Food & Beverages',
    'Meat & Poultry',
    'Dairy Products',
    'Snacks',
    'Bakery',
    'Condiments & Sauces',
    'Health & Beauty',
    'Household',
    'Other'
  ];
  
  const subcategories = {
    'Food & Beverages': [
      'Coffee & Tea',
      'Juices',
      'Soft Drinks',
      'Water',
      'Other Beverages'
    ],
    'Meat & Poultry': [
      'Beef',
      'Chicken',
      'Lamb',
      'Processed Meat',
      'Other Meat'
    ],
    'Dairy Products': [
      'Milk',
      'Cheese',
      'Yogurt',
      'Butter',
      'Other Dairy'
    ],
    'Snacks': [
      'Chips',
      'Nuts',
      'Dried Fruits',
      'Cookies',
      'Other Snacks'
    ],
    'Bakery': [
      'Bread',
      'Cakes',
      'Pastries',
      'Other Bakery'
    ],
    'Condiments & Sauces': [
      'Spices',
      'Sauces',
      'Oils',
      'Dressings',
      'Other Condiments'
    ],
    'Health & Beauty': [
      'Skincare',
      'Hair Care',
      'Oral Care',
      'Cosmetics',
      'Other Health & Beauty'
    ],
    'Household': [
      'Cleaning',
      'Kitchen',
      'Bathroom',
      'Other Household'
    ],
    'Other': [
      'Miscellaneous'
    ]
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      const newImages = [...formData.images];
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push({
            id: Date.now() + Math.random().toString(36).substring(2, 9),
            url: reader.result,
            name: file.name
          });
          
          setFormData({
            ...formData,
            images: newImages
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (id) => {
    setFormData({
      ...formData,
      images: formData.images.filter(image => image.id !== id)
    });
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.stock) {
      newErrors.stock = 'Stock quantity is required';
    } else if (isNaN(formData.stock) || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Stock must be a non-negative number';
    }
    
    if (formData.images.length === 0) {
      newErrors.images = 'At least one product image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstError = document.querySelector('.text-red-600');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would call the onSubmit prop with the form data
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      // Reset form if it's a new product
      if (!isEditing) {
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          subcategory: '',
          sku: '',
          stock: '',
          images: [],
          certifications: [],
          ingredients: '',
          nutritionalInfo: '',
          origin: '',
          shelfLife: '',
          storageInstructions: '',
          isHalal: true,
          isOrganic: false,
          isVegan: false,
          tags: []
        });
      }
    } catch (error) {
      console.error('Product submission error:', error);
      setErrors({
        form: 'Failed to save product. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {isEditing 
            ? 'Update your product information below' 
            : 'Fill in the details to add a new product to your inventory'}
        </p>
      </div>

      {/* Success message */}
      {showSuccess && (
        <div className="m-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-md flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Product {isEditing ? 'updated' : 'added'} successfully!
        </div>
      )}
      
      {/* Error message */}
      {errors.form && (
        <div className="m-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Basic Information
            </h3>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                } shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Price (USD) *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`block w-full pl-7 pr-12 py-2 rounded-md ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                    placeholder="0.00"
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md ${
                    errors.stock ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subcategory
                </label>
                <select
                  id="subcategory"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  disabled={!formData.category}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 disabled:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:disabled:bg-gray-800 dark:disabled:text-gray-500`}
                >
                  <option value="">Select Subcategory</option>
                  {formData.category && subcategories[formData.category]?.map((subcategory) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                SKU (Stock Keeping Unit)
              </label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Product Details
            </h3>
            
            <div>
              <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Ingredients
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                rows={3}
                value={formData.ingredients}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="List all ingredients separated by commas"
              />
            </div>
            
            <div>
              <label htmlFor="nutritionalInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nutritional Information
              </label>
              <textarea
                id="nutritionalInfo"
                name="nutritionalInfo"
                rows={3}
                value={formData.nutritionalInfo}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Calories, protein, carbs, etc."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="origin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Country of Origin
                </label>
                <input
                  type="text"
                  id="origin"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="shelfLife" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Shelf Life
                </label>
                <input
                  type="text"
                  id="shelfLife"
                  name="shelfLife"
                  value={formData.shelfLife}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="e.g., 12 months"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="storageInstructions" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Storage Instructions
              </label>
              <input
                type="text"
                id="storageInstructions"
                name="storageInstructions"
                value={formData.storageInstructions}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="e.g., Store in a cool, dry place"
              />
            </div>
            
            <div className="space-y-4">
              <p className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Product Attributes
              </p>
              
              <div className="flex items-center">
                <input
                  id="isHalal"
                  name="isHalal"
                  type="checkbox"
                  checked={formData.isHalal}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="isHalal" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Halal Certified
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="isOrganic"
                  name="isOrganic"
                  type="checkbox"
                  checked={formData.isOrganic}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="isOrganic" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Organic
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="isVegan"
                  name="isVegan"
                  type="checkbox"
                  checked={formData.isVegan}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="isVegan" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Vegan
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Images */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            Product Images *
          </h3>
          
          <div className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((image) => (
                <div key={image.id} className="relative">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={image.url}
                      alt={image.name}
                      width={200}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                <label htmlFor="image-upload" className="cursor-pointer w-full h-full flex flex-col items-center justify-center p-4">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="mt-2 block text-sm font-medium text-gray-500 dark:text-gray-400">
                    Add Image
                  </span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
            {errors.images && (
              <p className="mt-2 text-sm text-red-600">{errors.images}</p>
            )}
          </div>
        </div>
        
        {/* Tags */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            Tags
          </h3>
          
          <div className="mt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-emerald-400 hover:bg-emerald-200 hover:text-emerald-500 focus:outline-none dark:hover:bg-emerald-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            
            <div className="flex">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add a tag"
                className="block w-full rounded-l-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button
                type="button"
                onClick={addTag}
                className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 shadow-sm text-sm font-medium rounded-r-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Press Enter or click the plus button to add a tag
            </p>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {isEditing ? 'Update Product' : 'Create Product'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}