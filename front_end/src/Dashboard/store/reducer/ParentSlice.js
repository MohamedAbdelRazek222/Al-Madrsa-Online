import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  ParentId :"6372d5c501038356d4289486",
  ParentData:[],
  childData: [],
  isLoading: false,
  error: null,
  isUpdated: false,
};

export const getParent = createAsyncThunk(
  "Parent/getParent",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(`http://localhost:8000/Parent/${id}`, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const editParent = createAsyncThunk(
  "Parent/editParent",
  async ({ParentId,mydata}, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(`http://localhost:8000/Parent/${ParentId}`,mydata, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const creatParent = createAsyncThunk(
  "Parent/creatParent",
  async (parent, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(`http://localhost:8000/Parent/`,parent, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
      });
      return response.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
export const getChildren = createAsyncThunk(
  "Parent/getChildren",
  async (id,thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(`http://localhost:8000/Parent/child/${id}`, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const creatChildren = createAsyncThunk(
  "Parent/creatChildren",
  async (id,child, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(`http://localhost:8000/Parent/child/${id}`,child, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
      });
      return response.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const ParentSlice = createSlice({
  name: "Parent",
  initialState,
  reducers: {
    // setUpdated: (state, action) => ({...state, isUpdated: action.payload})
  },
  extraReducers: {

    // get parent
    [getParent.pending]: (state, action) =>  {
      state.isLoading = true;
      state.isUpdated = false;
    },
    [getParent.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.ParentData = action.payload;
    },
    [getParent.rejected]: (state, action) => { 
      state.isLoading = false
      state.isUpdated = false
      state.error = action.payload
    },
    // -------Add Parent
    [creatParent.pending]: (state, action) => ({...state, isUpdated: false}),
    [creatParent.fulfilled]: (state, action) => {
      state.ParentData.push(action.payload);
      state.isUpdated = true;
    },
    [creatParent.rejected]: (state, action) => {
        state.isUpdated = false;
    },
    // -------edit Parent
    [editParent.pending]: (state, action) => ({...state, isUpdated: false}),
    [editParent.fulfilled]: (state, action) => {
    state.ParentData = action.payload;
      state.isUpdated = true;
    },
    [editParent.rejected]: (state, action) => {
      state.isUpdated = false;
    },
    // get children
    [getChildren.pending]: (state, action) =>  {
      state.isLoading = true;
      state.isUpdated = false;
    },
    [getChildren.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isUpdated = false;
      state.childData = action.payload;
    },
    [getChildren.rejected]: (state, action) => { 
      state.isLoading = false
      state.isUpdated = false
      state.error = action.payload
    },
    // -------Add child
    [creatChildren.pending]: (state, action) => ({...state, isUpdated: false}),
    [creatChildren.fulfilled]: (state, action) => {
      state.childData=action.payload;
      state.isUpdated = true;
    },
    [creatChildren.rejected]: (state, action) => {
      state.isUpdated = false;
    },
  },
});

export const ParentReducer = ParentSlice.reducer;
export const ParentActions = ParentSlice.actions;
