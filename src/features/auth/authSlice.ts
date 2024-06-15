import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSimplifiedError } from "../../util";
import { APIService } from "../../util/APIService";
import { url } from "../../util/endpoints";
import { UserData } from "../../util/types";
export interface AuthState {
  loading: boolean;
  userData: UserData;
  token: string;
  activeUser: boolean;
  verifiedStatus: boolean;
  registerSuccess: boolean;
  verificationEmail: string;
  error: any;
  verifyOtpStatus: boolean;
  resendOtp: boolean;
  usernameValue: string;
  usernameStatus: boolean;
  forgotPasswordStatus: boolean;
  updatePasswordStatus: boolean;
}

const initialState: AuthState = {
  loading: false,
  userData: {} as UserData,
  token: "",
  activeUser: false,
  verifiedStatus: false,
  registerSuccess: false,
  verificationEmail: "",
  error: {},
  verifyOtpStatus: false,
  resendOtp: false,
  usernameValue: "",
  usernameStatus: false,
  forgotPasswordStatus: false,
  updatePasswordStatus: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: () => {
      return initialState;
    },
    restoreDefault: (state) => {
      state.loading = false;
      state.registerSuccess = false;
    },
    resetAll: (state) => {
      state.loading = false;
      state.registerSuccess = false;
      state.verifyOtpStatus = false;
      state.resendOtp = false;
    },
    setVerifyEmail: (state, action: PayloadAction<string>) => {
      state.verificationEmail = action.payload;
    },
    setResetPasswordStatus: (state, { payload }) => {
      state.forgotPasswordStatus = payload;
    },
    setupdatePasswordStatus: (state, { payload }) => {
      state.updatePasswordStatus = payload;
    },
    getAuthToken: (state) => {
      return state.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userData = payload.user;
        state.token = payload.token;
        state.registerSuccess = true;
        state.verificationEmail = payload?.user?.email;

        //set a cookie for the extension
        document.cookie = `ttk=${payload.token}; path=/;`;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.registerSuccess = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userData = payload.user;
        state.token = payload.token;
        state.activeUser = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.activeUser = false;
        state.token = {};
        state.userData = {};
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(verifyUserEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyUserEmail.fulfilled, (state) => {
        state.loading = false;
        state.verifiedStatus = true;
        state.activeUser = true;
      })
      .addCase(verifyUserEmail.rejected, (state) => {
        state.loading = false;
      })
      .addCase(verifyOtpStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtpStatus.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.verifyOtpStatus = true;
        state.activeUser = true;
      })
      .addCase(verifyOtpStatus.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.registerSuccess = false;
      })
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(resendOtp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.resendOtp = true;
      })
      .addCase(resendOtp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.registerSuccess = false;
      })
      .addCase(checkUsername.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUsername.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.usernameValue = payload.message;
        state.usernameStatus = payload.available;
      })
      .addCase(checkUsername.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.forgotPasswordStatus = true;
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.forgotPasswordStatus = false;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.updatePasswordStatus = false;
      })
      .addCase(updatePassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.updatePasswordStatus = true;
      })
      .addCase(updatePassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.updatePasswordStatus = false;
      })
      .addCase(validateResetPasswordOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(validateResetPasswordOtp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userData = payload.user;
        state.token = payload.token;
      })
      .addCase(validateResetPasswordOtp.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const registerUser = createAsyncThunk(
  "registerUser",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.post(`${url?.register}`, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.post(`${url.forgotPassword}`, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const validateResetPasswordOtp = createAsyncThunk(
  "validateResetPasswordOtp",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.post(
        `${url.validateResetPasswordOtp}`,
        payload
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.put(`${url.resetPassword}`, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const updatePassword = createAsyncThunk(
  "updatePassword",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.post(
        `${url.updatePassword(payload.token)}`,
        { password: payload.password }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const verifyOtpStatus = createAsyncThunk(
  "verifyOtpStatus",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.post(
        `${url?.verifyUserEmail}`,
        payload
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const checkUsername = createAsyncThunk(
  "checkUsername",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.get(
        `${url?.checkUsername}?username=${payload.username}`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const resendOtp = createAsyncThunk(
  "resendOtp",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.post(`${url.resendOtp}`, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.post(`${url.login}`, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logoutUser",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.post(`${url.logout}`, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const verifyUserEmail = createAsyncThunk(
  "verifyUserEmail",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.post(
        `${url.verifyUserEmail}?${payload}`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const authSelector = (state: any) => state.auth;

export const {
  clearState,
  resetAll,
  restoreDefault,
  setResetPasswordStatus,
  setupdatePasswordStatus,
  getAuthToken,
} = authSlice.actions;
export default authSlice.reducer;
