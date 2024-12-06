import { ZodError } from 'zod';
import { AppError } from '../utils/appError.js';

export const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        const errors = result.error.errors.reduce((acc, err) => {
          acc[err.path.join('.')] = err.message;
          return acc;
        }, {});
        
        throw new AppError('Validation failed', 400, errors);
      }
      
      req.validatedData = result.data;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(new AppError('Validation failed', 400, error.flatten().fieldErrors));
      } else {
        next(error);
      }
    }
  };
};