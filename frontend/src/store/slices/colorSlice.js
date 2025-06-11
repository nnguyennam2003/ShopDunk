import instance from "@/lib/axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const getListColors = createAsyncThunk("color/getListColors", async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get("/color")
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: "Something went wrong" })
    }
})

export const createColor = createAsyncThunk("color/createColor", async (colorData, { rejectWithValue }) => {
    try {
        const response = await instance.post("/color", colorData)
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: "Something went wrong" })
    }
})

export const deleteColor = createAsyncThunk("color/deleteColor", async (colorId, { rejectWithValue }) => {
    try {
        await instance.delete(`/color/${colorId}`)
        return colorId
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message: "Something went wrong" })
    }
})

const colorSlice = createSlice({
    name: "color",
    initialState: {
        colors: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getListColors.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getListColors.fulfilled, (state, action) => {
            state.isLoading = false
            state.colors = action.payload
        })
        builder.addCase(getListColors.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(createColor.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(createColor.fulfilled, (state, action) => {
            state.isLoading = false
            state.colors.push(action.payload)
        })
        builder.addCase(createColor.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(deleteColor.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(deleteColor.fulfilled, (state, action) => {
            state.isLoading = false
            state.colors = state.colors.filter(color => color.id !== action.payload)
        })
        builder.addCase(deleteColor.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})

export default colorSlice.reducer