import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
// import { useDispatch } from "react-redux";
import {
    useNavigate
} from 'react-router-dom';

const initialState = {
    TeacherId: "",
    TeacherData: [],
    TeacherProfile: {},
    isLoading: false,
    error: null,
    isUpdated: false,
    isAdmin: true,
    isLoggedIn: false,
};

// with back end 
export const createTeacher = createAsyncThunk(
    "Teacher/createTeacher",
    //   Teacher ----> name of Slice
    //  createTeacher----> name of fun
    async (data, thunkAPI) => {
        // {data}: paramaters use it to change state

        const {rejectWithValue} = thunkAPI;
        try {
            // if (isAdmin === false) {
            //     const navigate = useNavigate()
            //     navigate("logIn")
            // }
            const response = await axios.post(`http://localhost:8000/admin/addTeacher`, data, {
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


export const getAllTeachers = createAsyncThunk(
    "Teacher/getAllTeachers",
    //   Teacher ----> name of Slice 
    //  createTeacher----> name of fun
    async (args, thunkAPI) => {
        // {data}: paramaters use it to change state

        const {
            rejectWithValue
        } = thunkAPI
        try {
            const response = await axios.get(`http://localhost:8000/admin/getAllTeachers`, {
                headers: {
                  "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                }
              })
            return response.data;
        } catch (error) {

            rejectWithValue(error.message)

        }

    }
);
export const setTeacherProfileAfterLggIn = createAsyncThunk(
    "Teacher/setTeacherProfileAfterLggIn",
    //   Teacher ----> name of Slice 
    //  createTeacher----> name of fun
    async (args, thunkAPI) => {
        // {data}: paramaters use it to change state

        const {
            rejectWithValue
        } = thunkAPI
        try {
            return args;
        } catch (error) {

            rejectWithValue(error.message)

        }

    }
);

export const editTeacher = createAsyncThunk(
    "Teacher/editTeacher",
    //   Teacher ----> name of Slice
    //  createTeacher----> name of fun
    async ({
        data,
        id
    }, thunkAPI) => {
        // {data}: paramaters use it to change state

        const {
            rejectWithValue
        } = thunkAPI;
        try {
            const response = await axios.put(`http://localhost:8000/admin/editTeacher/${id}`, data, {
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
export const deleteTeacher = createAsyncThunk(
    "Teacher/deleteTeacher",
    //   Teacher ----> name of Slice
    //  createTeacher----> name of fun
    async ({
        id
    }, thunkAPI) => {
        // {data}: paramaters use it to change state

        const {
            rejectWithValue
        } = thunkAPI;
        try {

            const response = await axios.delete(`http://localhost:8000/admin/deleteTeacher/${id}`, {
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


// RELATED TO GRID COMP-----------------------------------------------------


export const showAllTeachers = createAsyncThunk(
    "Teacher/showAllTeachers",
    //   Teacher ----> name of Slice 
    //  createTeacher----> name of fun
    async (args, thunkAPI) => {
        // {data}: paramaters use it to change state

        const {
            rejectWithValue
        } = thunkAPI
        try {     
            return args;
        } catch (error) {

            rejectWithValue(error.message)

        }

    }
);
export const setTeacherProfile = createAsyncThunk(
    "Teacher/setTeacherProfile",
    //   Teacher ----> name of Slice 
    //  createTeacher----> name of fun
    async (args, thunkAPI) => {
        // {data}: paramaters use it to change state
        const {rejectWithValue} = thunkAPI
        try {   
           console.log(sessionStorage.getItem());
            return args
        } catch (error) {

            rejectWithValue(error.message)

        }

    }
);



// ----------------------------------------------------------------



const TeacherSlice = createSlice({
    name: "Teacher",
    initialState,
    reducers: {
        // setUpdated: (state, action) => ({...state, isUpdated: action.payload})
    },
    extraReducers: {

        // get Teacher
        // -------Add Teacher   --> action =setState <----
        [createTeacher.pending]: (state, action) => ({
            ...state,
            isUpdated: false
        }),
        [createTeacher.fulfilled]: (state, action) => {
            state.TeacherData = action.payload; // action.payload--> response.data  or error.message
            state.isUpdated = true;
        },
        [createTeacher.rejected]: (state, action) => {
            state.isUpdated = false;
        },
        // -------------------------------------------------all Teacher
        [getAllTeachers.fulfilled]: (state, action) => {
            state.TeacherData = action.payload
            state.isUpdated = true;
        },
        [setTeacherProfileAfterLggIn.fulfilled]: (state, action) => {
          state.TeacherProfile= state.TeacherData.filter((element)=>{
               return element._id === action.payload
            })
            state.isLoggedIn = true;
        },
        // edit teacher ------------------------------------------------
        [editTeacher.fulfilled]: (state, action) => {
            const foundIndex = state.TeacherData.indexOf(teacherdata => teacherdata.id === action.payload.id)
            const filteredData = state.TeacherData.filter(teacherdata => teacherdata.id !== action.payload.id)
            state.TeacterData = filteredData.splice(foundIndex, 0, action.payload)
            state.isUpdated = true;
        },
        // delete teacher ------------------------------------------------
        [deleteTeacher.fulfilled]: (state, action) => {
            const filteredData = state.TeacherData.filter(teacherdata => teacherdata.id !== action.payload.id)
            state.TeacterData = filteredData
            state.isUpdated = true;
        },
        // showAllTeachers------------------------------------------------------
        [showAllTeachers.fulfilled]: (state, action) => {
            state.TeacherData=action.payload
        },
        [setTeacherProfile.fulfilled]: (state, action) => {
            state.TeacherProfile=action.payload

        },
    },
});





export const TeacherReducer = TeacherSlice.reducer; //initial state
export const TeacherActions = TeacherSlice.actions; //Reducers or functions like create Teacher