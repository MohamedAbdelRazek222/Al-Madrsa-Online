import { configureStore } from "@reduxjs/toolkit";
import { contextReducer } from "./reducer/contextSlice";
import { ParentReducer } from "./reducer/ParentSlice";
import { TeacherReducer } from "./reducer/TeacherSlice";
import { classReducer } from "./reducer/classSlice";
import { StudentReducer } from "./reducer/StudentSlice";

export const store = configureStore({
  reducer: {
    context: contextReducer,
    Parentcontx:ParentReducer,
    classcontx:classReducer,
    Teachercontx:TeacherReducer,
    Studentcontx:StudentReducer,
  },
});
