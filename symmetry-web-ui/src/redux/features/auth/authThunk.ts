import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCredentials, logoutUser } from "./authSlice";
import { api } from "../../../api/axiosInstance";
import type { ApiErrorResponse, AuthResponse } from "../../../types/Api";
import axios from "axios";

interface ThunkErrorPayload {
  statusCode: number;
  data: ApiErrorResponse;
}

interface ThunkConfig {
  rejectValue: ThunkErrorPayload;
}

export const login = createAsyncThunk<
  AuthResponse,
  Record<string, string>,
  ThunkConfig
>("auth/login", async (credentials, { dispatch, rejectWithValue }) => {
  try {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    const { user, accessToken } = response.data;
    dispatch(setCredentials({ user, accessToken }));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ApiErrorResponse>(error) && error.response?.data) {
      return rejectWithValue({
        statusCode: error.response.status,
        data: error.response.data,
      });
    }
    return rejectWithValue({
      statusCode: 500,
      data: { message: "Network Error" },
    });
  }
});

export const logout = createAsyncThunk<void, void, ThunkConfig>(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Failed to invalidate session on backend context:", error);
    } finally {
      dispatch(logoutUser());
    }
  },
);

export const checkAuthStatus = createAsyncThunk<void, void, ThunkConfig>(
  "auth/refresh",
  async (_, { dispatch }) => {
    try {
      const response = await api.post<AuthResponse>("/auth/refresh");
      const { user, accessToken } = response.data;
      dispatch(setCredentials({ user, accessToken }));
    } catch (error) {
      console.error("Failed to restore session:", error);
      dispatch(logoutUser());
    }
  },
);
