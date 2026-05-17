import type { AxiosError } from 'axios';

interface ApiErrorResponse {
  message?: string;
  data?: { message?: string } | Array<{ field: string; message: string }>;
}

/**
 * Extracts a human-readable error message from various error shapes.
 * Handles Axios errors, standard Error objects, and unknown types.
 */
export const extractErrorMessage = (error: unknown, fallback = 'An unexpected error occurred'): string => {
  // Axios error with response data
  if (isAxiosError(error)) {
    const data = error.response?.data as ApiErrorResponse | undefined;

    // Validation errors (array of field errors)
    if (data?.data && Array.isArray(data.data)) {
      return data.data.map((e) => e.message).join(', ');
    }

    // Simple message
    if (data?.message) {
      return data.message;
    }

    // Network error
    if (error.code === 'ERR_NETWORK') {
      return 'Network error — please check your connection';
    }

    // Timeout
    if (error.code === 'ECONNABORTED') {
      return 'Request timed out — please try again';
    }
  }

  // Standard Error
  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

function isAxiosError(error: unknown): error is AxiosError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as AxiosError).isAxiosError === true
  );
}
