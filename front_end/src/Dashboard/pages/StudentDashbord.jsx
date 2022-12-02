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
import { studentsGrid} from "../data/dummy";
import { Header } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { get, add, put, del } from "../helpers/Crud";
import { showAllStudents } from "../store/reducer/StudentSlice";
const StudentDashbord = () => {
    const { StudentData } = useSelector((state) => state.Studentcontx);
    const editOptions = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
    };
    const dispatch = useDispatch();
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
            // name
            required: true,
            regex: ["^[A-Za-z ]+$","name can not contain numbers or special characters"],
                minLength: [5,"name length must be longer than four letters "]
            }
            // ,{ 
                //     minLength: [5,"name length must be longer than four letters "]
                // }
                ,
                {
                    // email
                    required: true,
                    // regex: ["/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/","please enter a valide Email "],
                    minLength: [5,"name length must be longer than four letters "]
                },
                {
                    //    phone 
                    required: true,
                    // regex: ["/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g","inValid phone number"],
                    number :[true ,"Phone can not contain letters"],
                    minLength: [11,"phone length must be 11 numbers"]
        },
        {
            // gender
            required: true,
        },
        {
            // dob
            required: true,
        },
       
    ]
console.log(StudentData);
    const [data, setData] = useState([]);
    const refreshGrid = () => {
        get("http://localhost:8000/admin/getAllStudents").then((newData) => {
            for (let index = 0; index < newData.length; index++) {
                const element = newData[index];
                if (element.DOB) {
                    element.DOB=element.DOB.split("T")[0]   
                }
            }
            dispatch(showAllStudents(newData));
            setData({ result:newData, count: newData.length });
            console.log("newData",{newData});
        });
    };
    const dataSourceChanged = (state) => {
        if (state.action === "add") {
            add("http://localhost:8000/admin/addStudent", state.data).then((_) => {
                ref.current.hideSpinner()
                state.endEdit()
                refreshGrid()
            });
        }
            else if (state.requestType === 'add') {
                ref.current.hideSpinner();
                state.endEdit()
                console.log("editing");
            }
        else if (state.action === "edit") {
            put(
                `http://localhost:8000/admin/editStudent/${state.data._id}`,
                state.data
            ).then(() => {ref.current.hideSpinner()
                refreshGrid()
                state.endEdit()
            });
        } else if (state.requestType === "delete") {
            del(
                `http://localhost:8000/admin/deleteStudent/${state.data[0]._id}`
            ).then((_) => {
                ref.current.hideSpinner()
                state.endEdit()
                refreshGrid()
            });
        } else {
            console.log(state.action);
        }
    };
    const actionBegienHandler= (e) => {
        console.log(e);
    }
    const actionEndHandler= (e)=>{
        console.log(e);
}

const ref = useRef();
    useEffect(() => {
        refreshGrid();
    }, []);
    return (
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Students" />
            <GridComponent
                actionComplete={actionEndHandler}
                actionBegin={actionBegienHandler}
                dataSource={data}
                allowPaging={true}
                editSettings={editOptions}
                toolbar={toolbarOptions}
                dataSourceChanged={dataSourceChanged}
                width="auto"
                ref={ref}
            >
                <ColumnsDirective>
                    {studentsGrid.map((item, index) => (
                        <ColumnDirective validationRules={customIDRules[index]} key={index} {...item} />
                    ))}
                </ColumnsDirective>
                <Inject services={[Page, Sort, Edit, Toolbar, Search]} />
            </GridComponent>
        </div>
    );
};

export default StudentDashbord;
