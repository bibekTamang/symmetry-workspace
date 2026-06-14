import axios, { AxiosError } from "axios";

interface ApiErrorData {
  success?: boolean;
  message?: string;
}

function isUnwrappedThunkError(
  error: unknown,
): error is { data: { message: string } } {
  if (typeof error !== "object" || error === null) return false;

  const rootObj = error as Record<string, unknown>;

  if (
    "data" in rootObj &&
    typeof rootObj.data === "object" &&
    rootObj.data !== null
  ) {
    const dataObj = rootObj.data as Record<string, unknown>;

    return "message" in dataObj && typeof dataObj.message === "string";
  }

  return false;
}

export const getErrorMessage = (
  error: unknown,
  fallbackMessage = "Something went wrong. Please try again.",
): string => {
  if (isUnwrappedThunkError(error)) {
    return error.data.message;
  }

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorData>;
    return axiosError.response?.data?.message || fallbackMessage;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};
