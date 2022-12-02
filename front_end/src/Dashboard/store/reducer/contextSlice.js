import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ctx: {
    cart: false,
    userProfile: false,
    notification: false,
    chat: false,
  },
  activeMenu: true,
  screenSize: undefined
};

const contextSlice = createSlice({
  name: "context",
  initialState,
  reducers:{
    setActiveMenu: (state, action) => ({ ...state, activeMenu: action.payload }),
    setScreenSize: (state, action) => ({ ...state, screenSize: action.payload }),
    handleClick: (state, action) => {
      const allExceptPayload = Object.keys(initialState.ctx)
        .filter(opt => String(opt) !== String(action.payload))
        .reduce((opts, opt) => ({ ...opts, [opt]: false }), {});

      return { ...state, ctx: { ...allExceptPayload, [action.payload]: true } }
    }
  },
});

export const contextReducer = contextSlice.reducer;
export const contextActions = contextSlice.actions;
