import instance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const getListCart = createAsyncThunk("cart/getListCart", async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get('/cart');
        return response.data.carts;
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: "Something went wrong" });
    }
})

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (cartItemId, { rejectWithValue }) => {
    try {
        const response = await instance.delete('/cart/remove-from-cart', { data: { cart_item_id: cartItemId } });
        return response.data.updatedCart?.carts;
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: "Something went wrong" });
    }
})

export const addToCart = createAsyncThunk("cart/addToCart", async (cartData, { rejectWithValue }) => {
    try {
        const response = await instance.post('/cart/add-to-cart', cartData);
        return response.data.carts;
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: "Something went wrong" });
    }
})

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        carts: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getListCart.fulfilled, (state, action) => {
                state.carts = Array.isArray(action.payload) ? action.payload : [];
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getListCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Something went wrong";
            })
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.carts = action.payload;
                state.isLoading = false;
                state.error = null;
                toast.success("Sản phân đã được thêm vào giỏ hàng!", {
                    position: 'bottom-right',
                });
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Something went wrong";
            })
            .addCase(removeFromCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.carts = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Something went wrong";
            });
    },
});

export default cartSlice.reducer;