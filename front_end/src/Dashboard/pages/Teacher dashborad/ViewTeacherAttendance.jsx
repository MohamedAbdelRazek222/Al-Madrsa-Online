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
import { getAllclass } from '../../store/reducer/classSlice';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
export default function ViewTeacherAttendance() {
    // validationRules={customIDRules[index]} 
    const editOptions = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
    };
    const toolbarOptions = [
        // "add",
        // "Edit",
        // "Delete",
        // "Update",
        // "Cancel",
        "Search",
    ];
    const customIDRules =[
        {
            // name
            required: true,
         
        },
        {
            // email
            required: true,
    
        },
        {
        //    phone 
            required: true,
    
        },
        {
            // gender
            required: true,
        },
    ]
   
 const Param = useParams()
 const {id} = Param 

    const [details,setDetails]=useState()
    const dispach = useDispatch()
    useEffect(()=>{
        dispach(getAllclass())
    },[])
const [data,setData]=useState()

    const refreshGrid = () => {
        console.log("daaaaaaaakhlna");
        get(`http://localhost:8000/attend/${id}`).then((newData) => {
            console.log({newData});
            const students =newData[0].students
            console.log(students);
            setData({ result:students, count: students?.length });
            setDetails(newData)
        });
    };
   const rowDataBound=(args)=> {
        if (args.row) {
          if (getValue('attendenceStuts', args.data) ===true){
            args.row.classList.add('present');
          } else if(getValue('attendenceStuts', args.data) ===false ) {
              args.row.classList.add('absent');
          } else {
              args.row.classList.add('');
          }
        }
    }
   
    const dataSourceChanged = (state) => {
       if (state.action === "edit") {
            ref.current.hideSpinner();
            console.log("dd",state.data._id._id);
             details[0].students.map((element)=>{
                if (element._id._id===state.data._id._id) {
                    element.attendenceStuts=state.data.attendenceStuts
                    return 1
                }else{
                    refreshGrid()
                    return 0
                }
             })
            put(`http://localhost:8000/attend/${details[0]._id}`,details[0])
                .then((_) => refreshGrid())
                .then(() => ref.current.hideSpinner());
                refreshGrid()
            }
        else if (state.requestType === "delete") {
                ref.current.hideSpinner();
             details.students.filter((element)=>{
                    return element._id._id !==state.data._id._id
             })
             setDetails(details)
                del(
                    `http://localhost:8000/attend/${details._id}`,details
                    ).then((_) => refreshGrid());
             
            }
        else if (state.action === "add") {
                 } else {
                    console.log(state.action);
            }
    };
            
    const actionBegienHandler= (args) => {
        if (args.requestType==="add") {
        }
    }
    const actionEndHandler= (e)=>{
}

const ref = useRef();
    useEffect(() => {
        refreshGrid();
    }, []);
  return (
    details?  <div className="m-2 md:m-10 p-4 md:p-10 bg-white rounded-3xl">
                   { <h4 className="text-green-900">Lesson Date : { details[0]?.reportDate?.split("T")[0] || ""}</h4> }
                   { <h5 className="text-red-900">Report number : { details[0]?._id?.split("T")[0] || ""}</h5> }
                   { <p className="text-grey-300">by : {details[0]?.teacher?.name || ""}</p> }
                          <Header title="Attendance sheet" />
                          <GridComponent
                               actionComplete={actionEndHandler}
                               actionBegin={actionBegienHandler}
                               dataSource={data}
                               allowPaging={true}
                               allowEditing={true}
                               editSettings={editOptions}
                               toolbar={toolbarOptions}
                               rowDataBound={rowDataBound}
                               dataSourceChanged={dataSourceChanged}
                               width="auto"
                               ref={ref}
                          >
                              <ColumnsDirective>
                                  {attendanceGrid.map((item, index) => (
                                      <ColumnDirective validationRules={customIDRules[index]} key={index} {...item} />
                                  ))}
                              </ColumnsDirective>
                              <Inject services={[Page, Sort, Edit, Toolbar, Search]} />
                          </GridComponent>
                      </div>
                      :<></>
                 
    )
}
