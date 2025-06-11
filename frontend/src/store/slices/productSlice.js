import instance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getListProducts = createAsyncThunk("product/getListProducts", async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get('/product');
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: "Something went wrong" });
    }
})

export const getProductByCategory = createAsyncThunk("product/getProductByCategory", async (categoryId, { rejectWithValue }) => {
    try {
        const response = await instance.get(`/product?category=${categoryId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: "Something went wrong" });
    }
})

export const createProduct = createAsyncThunk("product/createProduct", async (productData, { rejectWithValue }) => {
    try {
        const response = await instance.post('/product/add-product', productData);
        return response.data.product;
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: "Something went wrong" })
    }
})

export const deleteProduct = createAsyncThunk("product/deleteProduct", async (productId, { rejectWithValue }) => {
    try {
       await instance.delete(`/product/delete-product/${productId}`);
        return productId
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: "Something went wrong" })
    }
})

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getListProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.isLoading = false;
            })
            .addCase(getListProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Failed to fetch products";
            })
            .addCase(getProductByCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProductByCategory.fulfilled, (state, action) => {
                state.products = action.payload;
                state.isLoading = false;
            })
            .addCase(getProductByCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Failed to fetch products";
            })
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
                state.isLoading = false;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Failed to create product";
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter((product) => product.id !== action.payload);
                state.isLoading = false;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Failed to delete product";
            });
    },
})

export default productSlice.reducer;