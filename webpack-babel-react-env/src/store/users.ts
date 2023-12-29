import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type LoginUserInput = {
  userEmail: string;
  userPass: string;
};

type LoginUserOutput = {
  email: string;
  password: string;
  access: string;
};

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (userCredentials: LoginUserInput): Promise<LoginUserOutput> => {
    // axios.defaults.xsrfCookieName = 'csrftoken';
    // axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    // axios.defaults.withCredentials = true;

    let setData: LoginUserOutput = {
      email: "",
      password: "",
      access: "",
    };

    const request = await axios.post(
      process.env.REACT_APP_AXIOS_ADDRESS + "api/auth/jwt/create/",
      {
        email: userCredentials.userEmail,
        password: userCredentials.userPass,
      }
    );
    console.log(request);
    console.log(request.data.access);
    if (request.data.access) {
      setData = {
        email: userCredentials.userEmail,
        password: userCredentials.userPass,
        access: request.data.access,
      };
      localStorage.setItem("user", JSON.stringify(setData));
    }
    console.log(setData);
    return setData;
  }
);

export const UserLogout = createAsyncThunk("user/Logout", async () => {
  await localStorage.removeItem("user");
});

type State = {
  readonly loading: boolean;
  readonly user: any;
  readonly error: string | null | undefined;
};
const initialState: State = {
  loading: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        if (action.error.message === "Request failed with status code 401") {
          state.error = "Access Denied! Invalid Credentials";
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default userSlice.reducer;
