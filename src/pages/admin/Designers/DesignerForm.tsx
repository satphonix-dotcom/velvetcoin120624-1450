import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Plus } from 'lucide-react';
import type { Designer } from '../../../types/designer';
import { designers } from '../../../data/designers';

interface DesignerFormData extends Omit<Designer, 'id' | 'coverImage' | 'products'> {
  coverImage: File | null;
}

const DesignerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const designer = isEditing ? designers.find(d => d.id === id) : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DesignerFormData>({
    defaultValues: designer ? {
      name: designer.name,
      description: designer.description,
      about: designer.about,
      details: designer.details,
      coverImage: null,
    } : undefined,
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setValue('coverImage', acceptedFiles[0]);
    },
  });

  const coverImage = watch('coverImage');

  const onSubmit = async (data: DesignerFormData) => {
    console.log('Form data:', data);
    // Handle form submission
    navigate('/admin/designers');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading font-heading1 text-3xl tracking-wider mb-2">
          {isEditing ? 'Edit Designer' : 'New Designer'}
        </h1>
        <p className="font-body text-gray-600">
          {isEditing ? 'Update designer details' : 'Add a new designer to your catalog'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
          <h2 className="font-heading font-heading2 text-xl">Basic Information</h2>
          
          <div>
            <label htmlFor="name" className="block font-body text-sm mb-2">
              Designer Name
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Designer name is required' })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block font-body text-sm mb-2">
              Short Description
            </label>
            <input
              type="text"
              id="description"
              {...register('description', { required: 'Description is required' })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block font-body text-sm mb-2">
              About
            </label>
            <div className="space-y-4">
              {watch('about')?.map((_, index) => (
                <div key={index} className="flex gap-4">
                  <textarea
                    {...register(`about.${index}` as const)}
                    rows={2}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const about = watch('about').filter((_, i) => i !== index);
                      setValue('about', about);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const about = watch('about') || [];
                  setValue('about', [...about, '']);
                }}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <Plus size={16} />
                Add Paragraph
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
          <h2 className="font-heading font-heading2 text-xl">Cover Image</h2>
          
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-gray-300 transition-colors cursor-pointer"
          >
            <input {...getInputProps()} />
            <Upload size={32} className="mx-auto mb-4 text-gray-400" />
            <p className="font-body text-gray-600">
              Drag and drop an image here, or click to select
            </p>
            <p className="font-body text-sm text-gray-500 mt-2">
              PNG, JPG, JPEG up to 10MB
            </p>
          </div>

          {coverImage && (
            <div className="relative aspect-video bg-gray-100">
              <img
                src={URL.createObjectURL(coverImage)}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setValue('coverImage', null)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
          <h2 className="font-heading font-heading2 text-xl">Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(watch('details') || {}).map(([key]) => (
              <div key={key}>
                <label className="block font-body text-sm mb-2">
                  {key}
                </label>
                <input
                  type="text"
                  {...register(`details.${key}` as const)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/designers')}
            className="px-6 py-3 border border-gray-200 font-body hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-black text-white font-body hover:bg-gray-900 transition-colors"
          >
            {isEditing ? 'Update Designer' : 'Create Designer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DesignerForm;