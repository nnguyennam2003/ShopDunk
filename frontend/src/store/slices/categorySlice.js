import instance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllCategories = createAsyncThunk("category/getAllCategories", async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get('/category');
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: "Something went wrong" });
    }
})

export const createCategory = createAsyncThunk("category/createCategory", async (categoryData, { rejectWithValue }) => {
    try {
        const response = await instance.post('/category/add-category', categoryData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: "Something went wrong" })
    }
})

export const deleteCategory = createAsyncThunk("category/deleteCategory", async (categoryId, { rejectWithValue }) => {
    try {
        const response = await instance.delete(`/category/delete-category/${categoryId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: "Something went wrong" })
    }
})

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.isLoading = false;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Failed to fetch categories";
            })
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
                state.isLoading = false;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Failed to create category";
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter((category) => category._id !== action.payload._id);
                state.isLoading = false;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Failed to delete category";
            });
    },
})

export default categorySlice.reducer;