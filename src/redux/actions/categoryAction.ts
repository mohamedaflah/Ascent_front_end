import { JobAxios } from "@/constants/axiosInstance";
import { categoryPayload } from "@/types/adminReducer";
import { handleErrors } from "@/util/handleErrors";
import { uploadImageToCloudinary } from "@/util/uploadImage";
import { createAsyncThunk } from "@reduxjs/toolkit";

//  Add category
export const addCategory = createAsyncThunk(
  "category/add-category",
  async (categoryData: categoryPayload, { rejectWithValue }) => {
    try {
      categoryData.categoryImage = await uploadImageToCloudinary(
        categoryData.categoryImage
      );

      const { data } = await JobAxios.post(
        `/api/category/add-category`,
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
    sendPayload: { id: string; categoryData: categoryPayload },
    { rejectWithValue }
  ) => {
    try {
      const storageData: { id: string; file: File }[] = JSON.parse(
        localStorage.getItem("files") ?? "{}"
      ) as { id: string; file: File }[];
     
      const existData = storageData.find(
        (value) => value.id === sendPayload.id
      );
     
      if (
        JSON.stringify(existData?.file) !==
        JSON.stringify(sendPayload.categoryData.categoryImage)
      ) {
        sendPayload.categoryData.categoryImage = await uploadImageToCloudinary(
          sendPayload.categoryData.categoryImage
        );
      }
      const { data } = await JobAxios.post(
        `/api/category/update-category/${sendPayload.id}`,
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
      const { data } = await JobAxios.get(`/api/category/delete-category/${id}`);
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
      const { data } = await JobAxios.get(`/api/category/getall-category`);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
