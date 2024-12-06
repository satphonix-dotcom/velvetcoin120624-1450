import { Product } from '../models/Product.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';
import { uploadToStorage } from '../utils/storage.js';

export const getAllProducts = catchAsync(async (req, res) => {
  const {
    page = 1,
    limit = 12,
    category,
    designer,
    sort = '-createdAt',
    search,
  } = req.query;

  // Build query
  const query = { status: 'active' };
  if (category) query.category = category;
  if (designer) query.designer = designer;
  if (search) {
    query.$text = { $search: search };
  }

  // Execute query with pagination
  const products = await Product.find(query)
    .populate('designer', 'name')
    .populate('vendor', 'firstName lastName')
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);

  // Get total count
  const total = await Product.countDocuments(query);

  res.json({
    status: 'success',
    results: products.length,
    pagination: {
      page: Number(page),
      pages: Math.ceil(total / limit),
      total,
    },
    products,
  });
});

export const getProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('designer')
    .populate('vendor', 'firstName lastName')
    .populate({
      path: 'reviews',
      match: { status: 'approved' },
      populate: { path: 'user', select: 'firstName lastName' },
    });

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res.json({
    status: 'success',
    product,
  });
});

export const createProduct = catchAsync(async (req, res) => {
  // Handle image uploads
  const imageUrls = [];
  if (req.files?.length) {
    for (const file of req.files) {
      const url = await uploadToStorage(file);
      imageUrls.push(url);
    }
  }

  const product = await Product.create({
    ...req.body,
    vendor: req.user._id,
    imageUrl: imageUrls[0],
    images: imageUrls,
  });

  res.status(201).json({
    status: 'success',
    product,
  });
});

export const updateProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Check ownership
  if (req.user.role !== 'admin' && product.vendor.toString() !== req.user._id.toString()) {
    throw new AppError('Not authorized to update this product', 403);
  }

  // Handle new image uploads
  if (req.files?.length) {
    const newImageUrls = [];
    for (const file of req.files) {
      const url = await uploadToStorage(file);
      newImageUrls.push(url);
    }
    req.body.images = [...(product.images || []), ...newImageUrls];
    if (!product.imageUrl) {
      req.body.imageUrl = newImageUrls[0];
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json({
    status: 'success',
    product: updatedProduct,
  });
});

export const deleteProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Check ownership
  if (req.user.role !== 'admin' && product.vendor.toString() !== req.user._id.toString()) {
    throw new AppError('Not authorized to delete this product', 403);
  }

  await product.deleteOne();

  res.json({
    status: 'success',
    message: 'Product deleted successfully',
  });
});