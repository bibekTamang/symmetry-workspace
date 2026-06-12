import axios, { AxiosError } from "axios";

interface ApiErrorData {
  success?: boolean;
  message?: string;
}

export const getErrorMessage = (
  error: unknown,
  fallbackMessage = "Something went wrong. Please try again."
): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorData>;
    return axiosError.response?.data?.message || fallbackMessage;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};