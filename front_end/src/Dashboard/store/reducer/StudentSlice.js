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
    StudentData: [],
    StudentProfile: {},
    isLoading: false,
    error: null,
    isUpdated: false,
    Enrolled: false,
    isAdmin: true,
};

// with back end 
export const createStudent = createAsyncThunk(
    "Student/createStudent",
    //   Student ----> name of Slice
    //  createStudent----> name of fun
    async (data, thunkAPI) => {
        // {data}: paramaters use it to change state
        const {rejectWithValue} = thunkAPI;
        try {
            // if (isAdmin === false) {
            //     const navigate = useNavigate()
            //     navigate("logIn")
            // }
            const response = await axios.post(`http://localhost:8000/admin/addStudent`, data, {
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


export const getAllStudents = createAsyncThunk(
    "Student/getAllStudents",
    //   Student ----> name of Slice 
    //  createStudent----> name of fun
    async (args, thunkAPI) => {
        // {data}: paramaters use it to change state

        const {
            rejectWithValue
        } = thunkAPI
        try {
            const response = await axios.get(`http://localhost:8000/admin/getAllStudents`, {
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

export const editEnrollStudent = createAsyncThunk(
    "Student/editEnrollStudent",
    //   Student ----> name of Slice
    //  createStudent----> name of fun
    async ({
        data,
        id
    }, thunkAPI) => {
        // {data}: paramaters use it to change state

        const {
            rejectWithValue
        } = thunkAPI;
        try {
            console.log(id);
            const response = await axios.put(`http://localhost:8000/admin/editEnrollStudent/${id}`, data, {
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
export const editStudent = createAsyncThunk(
    "Student/editStudent",
    //   Student ----> name of Slice
    //  createStudent----> name of fun
    async ({
        data,
        id
    }, thunkAPI) => {
        // {data}: paramaters use it to change state

        const {
            rejectWithValue
        } = thunkAPI;
        try {
            console.log(id);
            const response = await axios.put(`http://localhost:8000/admin/editStudent/${id}`, data, {
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
export const deleteStudent = createAsyncThunk(
    "Student/deleteStudent",
    //   Student ----> name of Slice
    //  createStudent----> name of fun
    async ({
        id
    }, thunkAPI) => {
        // {data}: paramaters use it to change state

        const {
            rejectWithValue
        } = thunkAPI;
        try {
            const response = await axios.delete(`http://localhost:8000/admin/deleteStudent/${id}`, {
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


export const showAllStudents = createAsyncThunk(
    "Student/showAllStudents",
    //   Student ----> name of Slice 
    //  createStudent----> name of fun
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
export const setStudentProfile = createAsyncThunk(
    "Student/setStudentProfile",
    //   Student ----> name of Slice 
    //  createStudent----> name of fun
    async (args, thunkAPI) => {
        // {data}: paramaters use it to change state
        const {
            rejectWithValue
        } = thunkAPI
        try {   
            return args
        } catch (error) {

            rejectWithValue(error.message)

        }

    }
);
export const setStudentProfileAfterLggIn = createAsyncThunk(
    "Student/setStudentProfileAfterLggIn",
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

export const EnrollStudent = createAsyncThunk(
    "Student/EnrollStudent",
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


// ----------------------------------------------------------------



const StudentSlice = createSlice({
    name: "Student",
    initialState,
    reducers: {
        // setUpdated: (state, action) => ({...state, isUpdated: action.payload})
    },
    extraReducers: {

        // get Student
        // -------Add Student   --> action =setState <----
        [createStudent.pending]: (state, action) => ({
            ...state,
            isUpdated: false
        }),
        [createStudent.fulfilled]: (state, action) => {
            state.StudentData = action.payload; // action.payload--> response.data  or error.message
            state.isUpdated = true;
        },
        [createStudent.rejected]: (state, action) => {
            state.isUpdated = false;
        },
        // -------------------------------------------------all Student
        [getAllStudents.fulfilled]: (state, action) => {
            state.StudentData = action.payload
            state.isUpdated = true;
        },
        [setStudentProfileAfterLggIn.fulfilled]: (state, action) => {
            let filter=state.StudentData.filter((std)=>{
                return std._id === action.payload
            })
            state.StudentProfile=filter[0]
            state.isLoggedIn = true;
        },
        // edit Student ------------------------------------------------
        [editStudent.fulfilled]: (state, action) => {
            const foundIndex = state.StudentData.indexOf(Studentdata => Studentdata.id === action.payload.id)
            const filteredData = state.StudentData.filter(Studentdata => Studentdata.id !== action.payload.id)
            state.StudentData = filteredData.splice(foundIndex, 0, action.payload)
            state.isUpdated = true;
        },
        [editEnrollStudent.fulfilled]: (state, action) => {
            const foundIndex = state.StudentData.indexOf(Studentdata => Studentdata.id === action.payload.id)
            const filteredData = state.StudentData.filter(Studentdata => Studentdata.id !== action.payload.id)
            state.StudentData = filteredData.splice(foundIndex, 0, action.payload)
            state.isUpdated = true;
        },
        // delete Student ------------------------------------------------
        [deleteStudent.fulfilled]: (state, action) => {
            const filteredData = state.StudentData.filter(Studentdata => Studentdata.id !== action.payload.id)
            state.StudentData = filteredData
            state.isUpdated = true;
        },
        // showAllStudents------------------------------------------------------
        [showAllStudents.fulfilled]: (state, action) => {
            state.StudentData=action.payload
        },
        [setStudentProfile.fulfilled]: (state, action) => {
           let filter=state.StudentData.filter((std)=>{
                return std._id= action.payload
            })
            state.StudentProfile=filter[0]
            console.log("here ",state.StudentProfile);
        },
        [EnrollStudent.fulfilled]: (state, action) => {
            state.StudentProfile.subjects.push(action.payload)
            state.Enrolled= true
        },
    },
});





export const StudentReducer = StudentSlice.reducer; //initial state
export const StudentActions = StudentSlice.actions; //Reducers or functions like create Student