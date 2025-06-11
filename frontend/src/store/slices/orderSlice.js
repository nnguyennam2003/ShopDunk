import instance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getOrders = createAsyncThunk("order/getOrders", async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get('/checkout')
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: "Something went wrong" })
    }
})

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.orders = action.payload
                state.isLoading = false
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.message || "Something went wrong"
            })
    }
})

export default orderSlice.reducer