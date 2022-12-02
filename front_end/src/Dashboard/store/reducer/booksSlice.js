import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { useDispatch } from "react-redux";

const initialState = {
  books: [],
  isLoading: false,
  error: null,
  isUpdated: false,
};

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get("http://localhost:3030/books", {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async (book, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post("http://localhost:3030/books", book, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
      });
      // dispatch(getBooks());
      return response.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (bookId, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      console.log(thunkAPI);
      const response = await axios.delete(
        `http://localhost:3030/books/${bookId}`, {
          headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
          }
        }
      );
      dispatch(getBooks());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editBook = createAsyncThunk(
  "books/editBook",
  async ({bookId, newBook}, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      console.log(thunkAPI);
      const response = await axios.put(
        `http://localhost:3030/books/${bookId}`, newBook, {
          headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
          }
        }
      );
      // dispatch(getBooks());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  // reducers: {
  //   setUpdated: (state, action) => ({...state, isUpdated: action.payload})
  // },
  extraReducers: {
    [getBooks.pending]: (state, action) =>  {
      state.isLoading = true;
      state.isUpdated = false;
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isUpdated = false;
      state.books = action.payload;
    },
    [getBooks.rejected]: (state, action) => { 
      state.isLoading = false
      state.isUpdated = false
      state.error = action.payload
    },
    // -------Add Book
    [addBook.pending]: (state, action) => ({...state, isUpdated: false}),
    [addBook.fulfilled]: (state, action) => {
      state.books.push(action.payload);
      state.isUpdated = true;
    },
    [addBook.rejected]: (state, action) => {
      state.isUpdated = false;
    },
    // -------Add Book
    [editBook.pending]: (state, action) => {
      state.isUpdated = false
    },
    [editBook.fulfilled]: (state, action) => {
      console.log("this is not good");
      state.isUpdated = true;
      const foundBookIndex = state.books.indexOf(book => String(book.id) === String(action.payload.id));
      // const newBooks = currentState.books.filter(book => String(book.id) !== String(action.payload.id));
      state.books[foundBookIndex] = action.payload;
    },
    [editBook.rejected]: (state, action) => {
      state.isUpdated = false
    },
  },
});

export const booksReducer = booksSlice.reducer;
export const booksActions = booksSlice.actions;
