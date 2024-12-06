import { ApiError } from './api-error';

export function handleError(error: unknown) {
  if (error instanceof ApiError) {
    // Handle specific API errors
    switch (error.status) {
      case 401:
        return 'Please sign in to continue';
      case 403:
        return 'You do not have permission to perform this action';
      case 404:
        return 'The requested resource was not found';
      default:
        return error.message;
    }
  }

  // Handle other types of errors
  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
}