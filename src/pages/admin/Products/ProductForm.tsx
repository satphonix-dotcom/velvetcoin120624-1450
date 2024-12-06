import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import type { Product } from '../../../types/product';

interface ProductFormData extends Omit<Product, 'id' | 'imageUrl'> {
  images: File[];
}

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    onDrop: (acceptedFiles) => {
      setValue('images', acceptedFiles);
    },
  });

  const images = watch('images');

  const onSubmit = async (data: ProductFormData) => {
    console.log('Form data:', data);
    // Handle form submission
    navigate('/admin/products');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading font-heading1 text-3xl tracking-wider mb-2">
          {isEditing ? 'Edit Product' : 'New Product'}
        </h1>
        <p className="font-body text-gray-600">
          {isEditing ? 'Update product details' : 'Add a new product to your catalog'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
          <h2 className="font-heading font-heading2 text-xl">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block font-body text-sm mb-2">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Product name is required' })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="designer" className="block font-body text-sm mb-2">
                Designer
              </label>
              <input
                type="text"
                id="designer"
                {...register('designer', { required: 'Designer is required' })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
              />
              {errors.designer && (
                <p className="mt-1 text-sm text-red-600">{errors.designer.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="category" className="block font-body text-sm mb-2">
                Category
              </label>
              <select
                id="category"
                {...register('category', { required: 'Category is required' })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
              >
                <option value="">Select a category</option>
                <option value="clothing">Clothing</option>
                <option value="shoes">Shoes</option>
                <option value="bags">Bags</option>
                <option value="jewelry">Jewelry</option>
                <option value="accessories">Accessories</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="price" className="block font-body text-sm mb-2">
                Price (USD)
              </label>
              <input
                type="number"
                id="price"
                {...register('price', {
                  required: 'Price is required',
                  min: { value: 0, message: 'Price must be positive' },
                })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block font-body text-sm mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              {...register('description')}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
            ></textarea>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
          <h2 className="font-heading font-heading2 text-xl">Images</h2>
          
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-gray-300 transition-colors cursor-pointer"
          >
            <input {...getInputProps()} />
            <Upload size={32} className="mx-auto mb-4 text-gray-400" />
            <p className="font-body text-gray-600">
              Drag and drop images here, or click to select files
            </p>
            <p className="font-body text-sm text-gray-500 mt-2">
              PNG, JPG, JPEG up to 10MB
            </p>
          </div>

          {images?.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((file: File, index) => (
                <div key={index} className="relative aspect-square bg-gray-100">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = [...images];
                      newImages.splice(index, 1);
                      setValue('images', newImages);
                    }}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-3 border border-gray-200 font-body hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-black text-white font-body hover:bg-gray-900 transition-colors"
          >
            {isEditing ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;