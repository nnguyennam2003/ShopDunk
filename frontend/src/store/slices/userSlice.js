import instance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("user/getUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get('/user/users');
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: "Something went wrong" })
    }
})

export const createUser = createAsyncThunk("user/createUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await instance.post('/user/add-user', userData);
        return response.data.user;
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: "Something went wrong" })
    }
})

export const deleteUser = createAsyncThunk("user/deleteUser", async (userId, { rejectWithValue }) => {
    try {
        const response = await instance.delete(`/user/delete-user/${userId}`);
        return response.data.id;
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: "Something went wrong" })
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
            })
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
                state.isLoading = false;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Failed to create user";
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                const deletedId = Number(action.payload)
                state.users = state.users.filter((user) => user.id !== deletedId);
                state.isLoading = false;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Failed to delete user";
            });
    }
})

export default userSlice.reducer;