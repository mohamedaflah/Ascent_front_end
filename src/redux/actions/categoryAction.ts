import { UserAxios } from "@/constants/axiosInstance";
import { Category } from "@/types/categoryReducer.type";
import { handleErrors } from "@/util/handleErrors";
import { createAsyncThunk } from "@reduxjs/toolkit";

//  Add category
export const addCategory = createAsyncThunk(
  "category/add-category",
  async (categoryData: Category, { rejectWithValue }) => {
    try {
      const { data } = await UserAxios.post(
        `/category/add-category`,
        categoryData
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

// update category
export const updateCategory = createAsyncThunk(
  "category/update-category",
  async (
    sendPayload: { id: string; categoryData: Category },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await UserAxios.post(
        `/category/update-category/${sendPayload.id}`,
        sendPayload.categoryData
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete-category",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await UserAxios.get(`/category/delete-category/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "category/get-allCategory",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await UserAxios.get(`/category/getall-category`);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
