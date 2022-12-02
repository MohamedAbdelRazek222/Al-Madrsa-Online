import React, { useEffect, useRef, useState } from "react";
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Page,
    Search,
    Inject,
    Toolbar,
    Edit,
    Sort,
} from "@syncfusion/ej2-react-grids";
import { getValue } from '@syncfusion/ej2-base';
import { Header } from "./../../components";
import { useDispatch, useSelector } from "react-redux";
import { get, add, put, del } from "./../../helpers/Crud";
import {getAllclass} from "./../../store/reducer/classSlice";
import { classGrid, filterTeacherData } from './../../data/dummy';
import { getAllTeachers } from "../../store/reducer/TeacherSlice";

export default function AdminViewCourses (props) {
    const editOptions = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,  
        mode : "Dialog" 
    };
    const toolbarOptions = [
        "Add",
        "Edit",
        "Delete",
        "Update",
        "Cancel",
        "Search",
    ];
    const customIDRules =[
        {
            // title
            required: true,
            regex: ["^[A-Za-z ]+$","course title can not contain numbers or special characters"],
            minLength: [5,"title length must be longer than four letters "]
        },
        {
            // price 
            required: true,
           number :[true ,"price can not contain letters"]
        },
        {
            //level 
            required: true,
        },
        {
            // teacher 
            minLength: [5,"title length must be longer than four letters "]
        
        },
        {
            // start 
            required: true,
        },
        {
            // end 
            required: true,
        
        },
    ]
    const dispatch = useDispatch();
    const [data, setData] = useState();
    const refreshGrid = () => {
        filterTeacherData()
        get("http://localhost:8000/admin/getAllClasses").then((newData) => {
            for (let index = 0; index < newData.length; index++) {
                const element = newData[index];
                if (element.startDate) {
                    element.startDate=element.startDate.split("T")[0]   
                    element.endDate=element.endDate.split("T")[0]   
                }
            }
            dispatch(getAllclass(newData));
            setData({ result: newData, count: newData.length });
        });
        dispatch(getAllTeachers());
        ref.current.hideSpinner();
    }

    const dataSourceChanged = (state) => {
        if (state.action === "add") {
            state.data.teacher._id=state.data.teacher.name
            state.data.teacher.name=""
            add("http://localhost:8000/admin/addclass", state.data).then((_) => {
                ref.current.hideSpinner()
                state.endEdit()
                refreshGrid()
            });
                console.log(state.data);
          }  else if (state.requestType === 'add') {
                    ref.current.hideSpinner();
                    console.log("editing");
            } else if (state.action === "edit") {
            ref.current.hideSpinner();
            state.data.teacher._id=state.data.teacher.name
            put(
                `http://localhost:8000/admin/editclass/${state.data._id}`,state.data
                )
                .then((_) => {
                    ref.current.hideSpinner()
                    state.endEdit()
                    refreshGrid()
                });
        } else if (state.requestType === "delete") {
            del(
                `http://localhost:8000/admin/deleteclass/${state.data[0]._id}`
            ).then((_) => {
                ref.current.hideSpinner()
                state.endEdit()
                refreshGrid()
            });
        } else {
            console.log(state.action);
        }
    };
    const ref = useRef(null);
    useEffect(() => {
        refreshGrid();
    }, []);
    return (
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Courses" />
           <GridComponent
                ref={ref}
                actionComplete={(e) => console.log(e)}
                dataSource={data}
                allowPaging={true}
                allowSorting={true}
                editSettings={editOptions}
                toolbar={toolbarOptions}
                dataSourceChanged={dataSourceChanged}
                width="auto"
            >
                <ColumnsDirective>
                {
                    classGrid.map((item, index) =>{
                       return( <ColumnDirective validationRules={customIDRules[index]} key={index} {...item} />
                    )})
                
                }              
                </ColumnsDirective>
                <Inject services={[Page, Sort, Edit, Toolbar, Search]} />
            </GridComponent>
        </div>
    );
};
