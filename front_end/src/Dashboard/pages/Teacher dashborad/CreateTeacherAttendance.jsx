import React from 'react'

import Header from '../../components/Header';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Sort, Edit, Toolbar, Search } from '@syncfusion/ej2-react-grids';
import { Inject } from '@syncfusion/ej2-react-schedule';
import { attendanceGrid } from '../../data/dummy';
import { useEffect, useRef, useState } from 'react';
import { add, del, get, put } from '../../helpers/Crud';
import jwt_decode from "jwt-decode";
import { getValue } from '@syncfusion/ej2-base';
import TeacherAttendanceReport from './TeacherAttendanceReport';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AttendenceRep, getAllclass } from '../../store/reducer/classSlice';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
export default function CreateTeacherAttendance() {
    const token= sessionStorage.getItem("token")
    if (token){
        const decoded = jwt_decode(token);
        var {id}=decoded
    }
    const {classData}=useSelector(state=>state.classcontx)
    const classdata= classData.filter((classitem)=>{
      return  classitem.teacher._id === id 
    })
    const myData = classdata[0]?.students
    const dispach = useDispatch()
    const navigate =useNavigate()
    const CreateNewReport=async()=>{
        const ReportId = await axios.post("http://localhost:8000/attend/",{id,myData})
        return ReportId.data
    }
    useEffect(()=>{
        dispach(getAllclass())
        const ReportId  = CreateNewReport() 
        dispach(AttendenceRep(ReportId))
        navigate("/teacher/showTeacherAttendance")
    },[])

  return (
    <>
</>

  )
}
