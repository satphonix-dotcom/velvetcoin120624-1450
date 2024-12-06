import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';

export const uploadToStorage = async (file) => {
  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    // Generate unique filename
    const filename = `${uuidv4()}${path.extname(file.originalname)}`;
    const filepath = path.join(uploadsDir, filename);

    // Save file
    await fs.writeFile(filepath, file.buffer);

    // Return file URL
    return `/uploads/${filename}`;
  } catch (error) {
    console.error('File upload error:', error);
    throw new Error('Error uploading file');
  }
};