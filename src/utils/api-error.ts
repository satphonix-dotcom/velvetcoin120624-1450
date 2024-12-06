export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static fromResponse(error: any): ApiError {
    if (error.response) {
      return new ApiError(
        error.response.status,
        error.response.data.error || 'An error occurred',
        error.response.data.errors
      );
    }
    return new ApiError(500, error.message || 'Network error');
  }
}