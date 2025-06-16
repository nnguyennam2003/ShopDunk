import instance from "@/lib/axios";
import { auth } from "@/lib/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "sonner";


export const login = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
    try {
        const response = await instance.post('/auth/login', userData)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const loginWithGoogle = createAsyncThunk(
    "auth/loginWithGoogle",
    async (_, { rejectWithValue }) => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();

            const response = await instance.post("/auth/google", { idToken });
            return response.data;
        } catch (error) {
            if (error.code === "auth/popup-closed-by-user") {
                return rejectWithValue({ message: "Bạn đã đóng cửa sổ đăng nhập Google." });
            }
            console.log(error);
            return rejectWithValue(error.response?.data || { message: "Đăng nhập Google thất bại" });
        }
    }
);

export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
    try {
        const response = await instance.post('/auth/register', userData)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getMe = createAsyncThunk("auth/getMe", async (_, { rejectWithValue }) => {
    try {
        const res = await instance.get("user/me", {
            withCredentials: true,
        })
        return res.data.user
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        await instance.post('/auth/logout', {}, { withCredentials: true });
        // await signOut(auth);
        // if (auth.currentUser === null) {
        //     return true;
        // } else {
        //     throw new Error("Firebase sign out failed");
        // }
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message || "Đăng xuất thất bại" });
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isLoading: false,
        isFetched: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoading = false;
                toast.success("Đăng nhập thành công", {
                    position: 'bottom-left',
                })
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Đăng nhập thất bại";
                toast.error("Email hoặc password không đúng!", {
                    position: 'bottom-left',
                })
            })
            .addCase(loginWithGoogle.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                toast.success("Đăng nhập Google thành công", { position: 'bottom-left' });
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Đăng nhập Google thất bại";
                toast.error(state.error, { position: 'bottom-left' });
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoading = false;
                toast.success("Tài khoản của bạn tạo thanh công", {
                    position: 'bottom-left',
                });
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Tạo tài khoản thất bại";
                toast.error(state.error, {
                    position: 'bottom-left',
                });
            })
            .addCase(getMe.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.isFetched = false;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.isFetched = true
            })
            .addCase(getMe.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.isFetched = true
                state.error = action.payload.message || "Failed to fetch user data";
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isFetched = true;
                toast.success("Đã đăng xuất", {
                    position: 'bottom-left',
                });
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = action.payload.message || "Đăng xuất thất bại";
            });
    },
})

export default authSlice.reducer