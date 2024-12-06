import React from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';

interface GeneralSettingsData {
  siteName: string;
  siteDescription: string;
  supportEmail: string;
  supportPhone: string;
  logo: File | null;
  favicon: File | null;
}

const GeneralSettings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<GeneralSettingsData>({
    defaultValues: {
      siteName: 'Velvet Coin',
      siteDescription: 'Luxury fashion with cryptocurrency payments',
      supportEmail: 'support@velvetcoin.com',
      supportPhone: '+1 (555) 123-4567',
    },
  });

  const { getRootProps: getLogoProps, getInputProps: getLogoInput } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setValue('logo', acceptedFiles[0]);
    },
  });

  const { getRootProps: getFaviconProps, getInputProps: getFaviconInput } = useDropzone({
    accept: {
      'image/*': ['.ico', '.png'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setValue('favicon', acceptedFiles[0]);
    },
  });

  const logo = watch('logo');
  const favicon = watch('favicon');

  const onSubmit = (data: GeneralSettingsData) => {
    console.log('Form data:', data);
    // Handle form submission
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="font-heading font-heading2 text-xl mb-6">General Settings</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="siteName" className="block font-body text-sm mb-2">
              Site Name
            </label>
            <input
              type="text"
              id="siteName"
              {...register('siteName', { required: 'Site name is required' })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
            />
            {errors.siteName && (
              <p className="mt-1 text-sm text-red-600">{errors.siteName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="supportEmail" className="block font-body text-sm mb-2">
              Support Email
            </label>
            <input
              type="email"
              id="supportEmail"
              {...register('supportEmail', { required: 'Support email is required' })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
            />
            {errors.supportEmail && (
              <p className="mt-1 text-sm text-red-600">{errors.supportEmail.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="supportPhone" className="block font-body text-sm mb-2">
              Support Phone
            </label>
            <input
              type="tel"
              id="supportPhone"
              {...register('supportPhone')}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
            />
          </div>
        </div>

        <div>
          <label htmlFor="siteDescription" className="block font-body text-sm mb-2">
            Site Description
          </label>
          <textarea
            id="siteDescription"
            rows={3}
            {...register('siteDescription')}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-body text-sm mb-2">Logo</label>
            <div
              {...getLogoProps()}
              className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-gray-300 transition-colors cursor-pointer"
            >
              <input {...getLogoInput()} />
              <Upload size={24} className="mx-auto mb-2 text-gray-400" />
              <p className="font-body text-sm text-gray-600">
                Drop logo here, or click to select
              </p>
            </div>
            {logo && (
              <div className="mt-2 relative inline-block">
                <img
                  src={URL.createObjectURL(logo)}
                  alt="Logo preview"
                  className="h-12 w-auto"
                />
                <button
                  type="button"
                  onClick={() => setValue('logo', null)}
                  className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <X size={12} />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block font-body text-sm mb-2">Favicon</label>
            <div
              {...getFaviconProps()}
              className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-gray-300 transition-colors cursor-pointer"
            >
              <input {...getFaviconInput()} />
              <Upload size={24} className="mx-auto mb-2 text-gray-400" />
              <p className="font-body text-sm text-gray-600">
                Drop favicon here, or click to select
              </p>
            </div>
            {favicon && (
              <div className="mt-2 relative inline-block">
                <img
                  src={URL.createObjectURL(favicon)}
                  alt="Favicon preview"
                  className="h-8 w-8"
                />
                <button
                  type="button"
                  onClick={() => setValue('favicon', null)}
                  className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white font-body hover:bg-gray-900 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettings;