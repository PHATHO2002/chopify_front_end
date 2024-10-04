import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from 'jwt-decode';

interface TokenProps {
  accessToken: string;
  refreshToken: string;
}

interface DecodedToken {
  _id: string;
  userName: string;
  role: number;
  avatar: string;
}

interface AuthSlice {
  isLoggedIn: boolean;
  modalOpen: boolean;
  userData: DecodedToken | null;
  error: string;
}

// Hàm kiểm tra xem có userData trong localStorage hay không
const hasUserData = (): boolean => {
  const userDataString = localStorage.getItem("userData");
  return userDataString !== null && userDataString !== undefined && userDataString !== "";
};

const initialState: AuthSlice = {
  isLoggedIn: hasUserData(),
  modalOpen: false,
  userData: hasUserData() ? JSON.parse(localStorage.getItem("userData")!) : null,
  error: ""
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    updateModal: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload; // Cập nhật trực tiếp
    },
    doLogin: (state, action: PayloadAction<TokenProps>) => {
      const { accessToken, refreshToken } = action.payload;

      if (accessToken && refreshToken) {
        try {
          const decodedToken: DecodedToken = jwtDecode<DecodedToken>(accessToken);

          // Lưu token và userData vào localStorage
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("userData", JSON.stringify(decodedToken));

          return {
            ...state,
            userData: decodedToken,
            modalOpen: false,
            isLoggedIn: true,
            error: ""
          };
        } catch (error) {
          return {
            ...state,
            error: "Login failed: invalid token"
          };
        }
      } else {
        return {
          ...state,
          error: "Login failed: missing tokens"
        };
      }
    },
    doLogout: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userData");

      state.userData = null;
      state.isLoggedIn = false;
    }
  },
});

export const { updateModal, doLogin, doLogout } = authSlice.actions;
export default authSlice.reducer;
