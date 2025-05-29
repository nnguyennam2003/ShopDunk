import instance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const  getUsers = createAsyncThunk("user/getUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get('/user/users');
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.isLoading = false;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Failed to fetch users";
            });
    }
})

export default userSlice.reducer;