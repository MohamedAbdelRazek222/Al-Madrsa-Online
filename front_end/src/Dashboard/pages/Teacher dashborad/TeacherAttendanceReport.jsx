import React from 'react'
import Header from './../../components/Header';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Sort, Edit, Toolbar, Search } from '@syncfusion/ej2-react-grids';
import { Inject } from '@syncfusion/ej2-react-schedule';
import {attendanceReprtGrid } from './../../data/dummy';
import { useEffect, useRef, useState } from 'react';
import { add, del, get, put } from './../../helpers/Crud';
export default function TeacherAttendanceReport() {
    const editOptions = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
    };
    const toolbarOptions = [
        "add",
        "Edit",
        "Delete",
        "Update",
        "Cancel",
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
const [data,setData]=useState()

    const refreshGrid = () => {
        get("http://localhost:8000/attend").then((newData) => {
            newData.forEach(element => {
                element.reportDate=element?.reportDate?.split("T")[0]
            });
            setData({ result:newData, count: newData.length });
        });
    };
   
    const dataSourceChanged = (state) => {
       if (state.action === "edit") {
            ref.current.hideSpinner();
            put(`http://localhost:8000/attend/${state.data._id}`,state.data)
                .then((_) => refreshGrid())
                .then(() => ref.current.hideSpinner());
                refreshGrid()
            }
        else if (state.requestType === "delete") {
                ref.current.hideSpinner();
                del(
                    `http://localhost:8000/attend/${state.data._id}`
                    ).then((_) => refreshGrid());
             
            }
        else if (state.action === "add") {
                    add("http://localhost:8000/admin/attend", state.data).then(
                        (_) => refreshGrid()
                        );
                        console.log(state.data)
                 } else {
                    console.log(state.action);
            }
    };

const ref = useRef();
    useEffect(() => {
        refreshGrid();
    }, []);
  return (
    <>       
             <div className="m-2 md:m-10 p-4 md:p-10 bg-white rounded-3xl">
                     <Header title="Attendance sheet" />
                     <GridComponent
                          dataSource={data}
                          allowPaging={true}
                          allowEditing={true}
                          editSettings={editOptions}
                          toolbar={toolbarOptions}
                          dataSourceChanged={dataSourceChanged}
                          width="auto"
                          ref={ref}
                     >
                         <ColumnsDirective>
                             {attendanceReprtGrid.map((item, index) => (
                                 <ColumnDirective validationRules={customIDRules[index]} key={index} {...item} />
                             ))}
                         </ColumnsDirective>
                         <Inject services={[Page, Sort, Edit, Toolbar, Search]} />
                     </GridComponent>
                 </div>
             </>

  )
}
