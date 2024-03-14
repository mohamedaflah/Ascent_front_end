import {
  AddCategoryPayload,
  Category,
  CategoryReducerInitial,
} from "@/types/categoryReducer.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../actions/categoryAction";
import toast from "react-hot-toast";
import { ErrorPayload } from "@/types/AllTypes";


const initialState: CategoryReducerInitial = {
  loading: false,
  err: false,
  categories: null,
};
const categoryReducer = createSlice({
  name: "categoryreducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.err = false;
      })
      .addCase(
        addCategory.fulfilled,
        (state, action: PayloadAction<AddCategoryPayload>) => {
          state.loading = false;
          const { payload } = action;
          state.err = false;
          const categories: Category[] | null = state.categories;
          categories?.push(payload?.category);
          state.categories = categories;
          toast.success("Category Added ")
        }
      )
      .addCase(addCategory.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.categories = null;
      })
      //   update category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        const updatedCategoryData: Category = payload.category;
        const categories = state.categories?.map((category: Category) => {
          if (category._id === updatedCategoryData._id) {
            return { ...category, ...updatedCategoryData };
          }
          return category;
        });
        state.categories = categories as Category[] | null;
        state.err = false;
      })
      .addCase(updateCategory.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.categories = null;
      })
      //   delete category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        const updatedCategoryData: Category = payload.category;
        const categories = state.categories?.map((category: Category) => {
          if (category._id === updatedCategoryData._id) {
            return { ...category, ...updatedCategoryData };
          }
          return category;
        });
        state.categories = categories as Category[] | null;
        state.err = false;
      })
      .addCase(deleteCategory.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.categories = null;
      })
      //   get all categories
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.categories = payload.categories as Category[];
       
      })
      .addCase(getAllCategories.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.categories = null;
      });
  },
});

export default categoryReducer.reducer;
