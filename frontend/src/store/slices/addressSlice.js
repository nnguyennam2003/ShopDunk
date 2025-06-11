import instance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getListAddress = createAsyncThunk("address/getListAddress", async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get('/address');
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: "Something went wrong" });
    }
})

export const createAddress = createAsyncThunk("address/createAddress", async (addressData, { rejectWithValue }) => {
    try {
        const response = await instance.post('/address', addressData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: "Something went wrong" })
    }
})

export const setDefaultAddress = createAsyncThunk(
    "address/setDefaultAddress",
    async (addressId, { rejectWithValue }) => {
        try {
            const response = await instance.patch(`/address/${addressId}/default`);
            return response.data; // có thể trả về message hoặc address mới
        } catch (error) {
            return rejectWithValue(error?.response?.data || { message: "Something went wrong" });
        }
    }
)

export const deleteAddress = createAsyncThunk("address/deleteAddress", async (addressId, { rejectWithValue }) => {
    try {
        const response = await instance.delete(`/address/${addressId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: "Something went wrong" })
    }
})


const addressSlice = createSlice({
    name: "address",
    initialState: {
        addresses: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListAddress.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getListAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addresses = action.payload;
            })
            .addCase(getListAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Something went wrong";
            })
            .addCase(createAddress.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addresses.push(action.payload);
            })
            .addCase(createAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Something went wrong";
            })
            .addCase(setDefaultAddress.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(setDefaultAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                const addressId = action.meta.arg; // id truyền vào thunk
                state.addresses = state.addresses.map(addr =>
                    addr.id === addressId
                        ? { ...addr, is_default: true }
                        : { ...addr, is_default: false }
                );
            })
            .addCase(setDefaultAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Something went wrong";
            })
            .addCase(deleteAddress.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                const addressId = action.meta.arg
                state.addresses = state.addresses.filter(addr => addr.id !== addressId);
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Something went wrong";
            })
    }
})

export default addressSlice.reducer