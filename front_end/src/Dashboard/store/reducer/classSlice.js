import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
// import { useDispatch } from "react-redux";
const initialState = {
    classData: [],
    Enrolledclass: {},
    isLoading: false,
    error: null,
    isUpdated: false,
    isAdmin: true,
    AttendenceRepID : "",
    Enrolled : [ {
        courseId: "",
        Enroll : false
    }]
};

// with back end 
export const createclass = createAsyncThunk(
    "class/createclass",
    //   class ----> name of Slice
    //  createclass----> name of fun
    async (data, thunkAPI) => {
        // {data}: paramaters use it to change state

        const {rejectWithValue} = thunkAPI;
        try {
            console.log({data});
            const response = await axios.post(`http://localhost:8000/admin/addclass`, data, {
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
export const AttendenceRep = createAsyncThunk(
    "class/AttendenceRep",
    //   class ----> name of Slice
    //  createclass----> name of fun
    async (args, thunkAPI) => {
        // {data}: paramaters use it to change state

        const {rejectWithValue} = thunkAPI;
        try {
            return args;
        } catch (error) {
            rejectWithValue(error.message);
        }
    }
);


export const getAllclass = createAsyncThunk(
    "class/getAllclass",
    //   class ----> name of Slice 
    //  createclass----> name of fun
    async (args, thunkAPI) => {
        // {data}: paramaters use it to change state
        const {
            rejectWithValue
        } = thunkAPI
        try {
            const response = await axios.get(`http://localhost:8000/admin/getAllClasses`, {
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

export const editclass = createAsyncThunk(
    "class/editclass",
    //   class ----> name of Slice
    //  createclass----> name of fun
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
            const response = await axios.put(`http://localhost:8000/admin/editclass/${id}`, data, {
                headers: {
                  "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                }
              });
              console.log("adddddddddddddddddddd",response.data);
            return response.data;
        } catch (error) {
            rejectWithValue(error.message);
        }
    }
);
export const EnrollClass  = createAsyncThunk(
    "class/EnrollClass ",
    //   class ----> name of Slice
    //  createclass----> name of fun
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
            console.log(data);
            const response = await axios.put(`http://localhost:8000/admin/EnrollClass/${id}`, data, {
                headers: {
                  "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                }
              });
              console.log("adddddddddddddddddddd",response.data);
            return response.data;
        } catch (error) {
            rejectWithValue(error.message);
        }
    }
);
export const deleteclass = createAsyncThunk(
    "class/deleteclass",
    //   class ----> name of Slice
    //  createclass----> name of fun
    async ({
        id
    }, thunkAPI) => {
        // {data}: paramaters use it to change state

        const {
            rejectWithValue
        } = thunkAPI;
        try {

            const response = await axios.delete(`http://localhost:8000/admin/deleteclass/${id}`, {
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


export const showAllclass = createAsyncThunk(
    "class/showAllclass",
    //   class ----> name of Slice 
    //  createclass----> name of fun
    async (args, thunkAPI) => {
        // {data}: paramaters use it to change state

        const {
            rejectWithValue
        } = thunkAPI
        try {
console.log({args});      
            return args;
        } catch (error) {

            rejectWithValue(error.message)

        }

    }
);
export const Enrollcourse = createAsyncThunk(
    "class/Enrollcourse",
    //   class ----> name of Slice 
    //  createclass----> name of fun
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
export const classDatasetter = createAsyncThunk(
    "class/classDatasetter",
    //   class ----> name of Slice 
    //  createclass----> name of fun
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


const classSlice = createSlice({
    name: "class",
    initialState,
    reducers: {
        // setUpdated: (state, action) => ({...state, isUpdated: action.payload})
    },
    extraReducers: {

        // get class
        // -------Add class   --> action =setState <----
        [createclass.pending]: (state, action) => ({
            ...state,
            isUpdated: false
        }),
        [createclass.fulfilled]: (state, action) => {
            state.classData = action.payload; // action.payload--> response.data  or error.message
            state.isUpdated = true;
        },
        [createclass.rejected]: (state, action) => {
            state.isUpdated = false;
        },
        // -------------------------------------------------all class
        [getAllclass.fulfilled]: (state, action) => {
            state.classData = action.payload
            state.isUpdated = true;
        },
        // edit class ------------------------------------------------
        [editclass.fulfilled]: (state, action) => {
            
            const foundIndex = state.classData.indexOf(classdata => classdata._id === action.payload._id)
            const filteredData = state.classData.filter(classdata => classdata._id !== action.payload._id)
            state.classData = filteredData.splice(foundIndex, 0, action.payload)
            state.isUpdated = true;
        },
        // delete class ------------------------------------------------
        [deleteclass.fulfilled]: (state, action) => {
            const filteredData = state.classData.filter(classdata => classdata._id !== action.payload._id)
            state.classData = filteredData
            state.isUpdated = true;
        },
        // showAllclasss------------------------------------------------------
        [showAllclass.fulfilled]: (state, action) => {
            state.classData=action.payload
        },
        [AttendenceRep.fulfilled]: (state, action) => {
            state.AttendenceRepID=action.payload
        },
        [EnrollClass.fulfilled]: (state, action) => {
            state.Enrolledclass =action.payload.updateClass
            let enrooldata = state.Enrolled
            state.Enrolled=[...enrooldata,{
                courseId:action.payload.updateClass._id,
                Enroll : true
            }]
        },
   
        [classDatasetter.fulfilled]: (state, action) => {
            console.log(2);
            state.Enrolledclass =action.payload
            console.log(state.Enrolledclass);
        },
        // [Enrollcourse.fulfilled]: (state, action) => {
        //     let {Enrolledclass,stdId} =action.payload
        //     Enrolledclass.students.push(stdId)
        //     console.log("enrolledClassData",Enrolledclass);
        //     console.log("gfgfgggg",Enrolledclass);
        //     state.Enrolledclass= Enrolledclass
        //     console.log("adddddddddddddddddddddddddddddddddddddddddddddddddddddd",state.EnrollClass);
        // },
    },
});





export const classReducer = classSlice.reducer; //initial state
export const classActions = classSlice.actions; //Reducers or functions like create Teacher