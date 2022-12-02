import React, { useState } from "react";
import CellEditArgs from "@syncfusion/ej2-react-grids"
import { DataManager, Query } from '@syncfusion/ej2-data';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import {
    AiOutlineCalendar,
    AiOutlineShoppingCart,
    AiOutlineAreaChart,
    AiOutlineBarChart,
    AiOutlineStock,
} from "react-icons/ai";
import {
    FiShoppingBag,
    FiEdit,
    FiPieChart,
    FiBarChart,
    FiCreditCard,
    FiStar,
    FiShoppingCart,
} from "react-icons/fi";
import {
    BsKanban,
    BsBarChart,
    BsBoxSeam,
    BsCurrencyDollar,
    BsShield,  
    BsChatLeft,
} from "react-icons/bs";
import { BiColorFill } from "react-icons/bi";
import { IoMdContacts } from "react-icons/io";
import { RiContactsLine, RiStockLine } from "react-icons/ri";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { GiLouvrePyramid } from "react-icons/gi";
import { GrLocation } from "react-icons/gr";
import avatar from "./avatar.jpg";
import avatar2 from "./avatar2.jpg";
import avatar3 from "./avatar3.png";
import avatar4 from "./avatar4.jpg";
import product1 from "./product1.jpg";
import product2 from "./product2.jpg";
import product3 from "./product3.jpg";
import product4 from "./product4.jpg";
import product5 from "./product5.jpg";
import product6 from "./product6.jpg";
import product7 from "./product7.jpg";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { NavLink } from "react-router-dom";
import { get } from "./../helpers/Crud";
import { dataStateChange } from "@syncfusion/ej2-react-grids";

export const gridOrderImage = (props) => (
    <div>
        <img
            className="rounded-xl h-20 md:ml-3"
            src={props.ProductImage}
            alt="order-item"
        />
    </div> 
);


export const gridOrderStatus = (props) => (
    <button
        type="button"
        style={{ background: props.StatusBg }}
        className="text-white py-1 px-2 capitalize rounded-2xl text-md"
    >
        {props.Status}
    </button>
);

export const kanbanGrid = [
    { headerText: "To Do", keyField: "Open", allowToggle: true },

    { headerText: "In Progress", keyField: "InProgress", allowToggle: true },

    {
        headerText: "Testing",
        keyField: "Testing",
        allowToggle: true,
        isExpanded: false,
    },

    { headerText: "Done", keyField: "Close", allowToggle: true },
];
const gridEmployeeProfile = (props) => (
    <div className="flex items-center gap-2">
        <img
            className="rounded-full w-10 h-10"
            src={props.EmployeeImage}
            alt="employee"
        />
        <p>{props.Name}</p>
    </div>
);

const gridEmployeeTeachers = (props) => {
    const sportsData = ["Badminton", "Cricket", "Football", "Golf", "Tennis"];
    return (
        <div className="flex items-center gap-2">
            <ComboBoxComponent
                id="comboelement"
                dataSource={sportsData}
                text={props.exampleCol}
                placeholder="Select a game"
            />
        </div>
    );
};

const gridEmployeeCountry = (props) => (
    <div className="flex items-center justify-center gap-2">
        <GrLocation />
        <span>{props.Country}</span>
    </div>
);

const customerGridImage = (props) => (
    <div className="image flex gap-4">
        <img
            className="rounded-full w-10 h-10"
            src={props.CustomerImage}
            alt="employee"
        />
        <div>
            <p>{props.CustomerName}</p>
            <p>{props.CustomerEmail}</p>
        </div>
    </div>
);

const customerGridStatus = (props) => (
    <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
        <p
            style={{ background: props.StatusBg }}
            className="rounded-full h-3 w-3"
        />
        <p>{props.Status}</p>
    </div>
);
export const areaPrimaryXAxis = {
    valueType: "DateTime",
    labelFormat: "y",
    majorGridLines: { width: 0 },
    intervalType: "Years",
    edgeLabelPlacement: "Shift",
    labelStyle: { color: "gray" },
};

export const areaPrimaryYAxis = {
    labelFormat: "{value}%",
    lineStyle: { width: 0 },
    maximum: 4,
    interval: 1,
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    labelStyle: { color: "gray" },
};
export const barPrimaryXAxis = {
    valueType: "Category",
    interval: 1,
    majorGridLines: { width: 0 },
};
export const barPrimaryYAxis = {
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 },
    labelStyle: { color: "transparent" },
};
const areaChartData = [
    [
        { x: new Date(2002, 0, 1), y: 2.2 },
        { x: new Date(2003, 0, 1), y: 3.4 },
        { x: new Date(2004, 0, 1), y: 2.8 },
        { x: new Date(2005, 0, 1), y: 1.6 },
        { x: new Date(2006, 0, 1), y: 2.3 },
        { x: new Date(2007, 0, 1), y: 2.5 },
        { x: new Date(2008, 0, 1), y: 2.9 },
        { x: new Date(2009, 0, 1), y: 3.8 },
        { x: new Date(2010, 0, 1), y: 1.4 },
        { x: new Date(2011, 0, 1), y: 3.1 },
    ],
    [
        { x: new Date(2002, 0, 1), y: 2 },
        { x: new Date(2003, 0, 1), y: 1.7 },
        { x: new Date(2004, 0, 1), y: 1.8 },
        { x: new Date(2005, 0, 1), y: 2.1 },
        { x: new Date(2006, 0, 1), y: 2.3 },
        { x: new Date(2007, 0, 1), y: 1.7 },
        { x: new Date(2008, 0, 1), y: 1.5 },
        { x: new Date(2009, 0, 1), y: 2.8 },
        { x: new Date(2010, 0, 1), y: 1.5 },
        { x: new Date(2011, 0, 1), y: 2.3 },
    ],
    [
        { x: new Date(2002, 0, 1), y: 0.8 },
        { x: new Date(2003, 0, 1), y: 1.3 },
        { x: new Date(2004, 0, 1), y: 1.1 },
        { x: new Date(2005, 0, 1), y: 1.6 },
        { x: new Date(2006, 0, 1), y: 2 },
        { x: new Date(2007, 0, 1), y: 1.7 },
        { x: new Date(2008, 0, 1), y: 2.3 },
        { x: new Date(2009, 0, 1), y: 2.7 },
        { x: new Date(2010, 0, 1), y: 1.1 },
        { x: new Date(2011, 0, 1), y: 2.3 },
    ],
];

export const areaCustomSeries = [
    {
        dataSource: areaChartData[0],
        xName: "x",
        yName: "y",
        name: "USA",
        opacity: "0.8",
        type: "SplineArea",
        width: "2",
    },
    {
        dataSource: areaChartData[1],
        xName: "x",
        yName: "y",
        name: "France",
        opacity: "0.8",
        type: "SplineArea",
        width: "2",
    },
    {
        dataSource: areaChartData[2],
        xName: "x",
        yName: "y",
        name: "Germany",
        opacity: "0.8",
        type: "SplineArea",
        width: "2",
    },
];

export const barChartData = [
    [
        { x: "USA", y: 46 },
        { x: "GBR", y: 27 },
        { x: "CHN", y: 26 },
    ],
    [
        { x: "USA", y: 37 },
        { x: "GBR", y: 23 },
        { x: "CHN", y: 18 },
    ],
    [
        { x: "USA", y: 38 },
        { x: "GBR", y: 17 },
        { x: "CHN", y: 26 },
    ],
];

export const barCustomSeries = [
    {
        dataSource: barChartData[0],
        xName: "x",
        yName: "y",
        name: "Gold",
        type: "Column",
        marker: {
            dataLabel: {
                visible: true,
                position: "Top",
                font: { fontWeight: "600", color: "#ffffff" },
            },
        },
    },
    {
        dataSource: barChartData[1],
        xName: "x",
        yName: "y",
        name: "Silver",
        type: "Column",
        marker: {
            dataLabel: {
                visible: true,
                position: "Top",
                font: { fontWeight: "600", color: "#ffffff" },
            },
        },
    },
    {
        dataSource: barChartData[2],
        xName: "x",
        yName: "y",
        name: "Bronze",
        type: "Column",
        marker: {
            dataLabel: {
                visible: true,
                position: "Top",
                font: { fontWeight: "600", color: "#ffffff" },
            },
        },
    },
];
export const colorMappingData = [
    [
        { x: "Jan", y: 6.96 },
        { x: "Feb", y: 8.9 },
        { x: "Mar", y: 12 },
        { x: "Apr", y: 17.5 },
        { x: "May", y: 22.1 },
        { x: "June", y: 25 },
        { x: "July", y: 29.4 },
        { x: "Aug", y: 29.6 },
        { x: "Sep", y: 25.8 },
        { x: "Oct", y: 21.1 },
        { x: "Nov", y: 15.5 },
        { x: "Dec", y: 9.9 },
    ],
    ["#FFFF99"],
    ["#FFA500"],
    ["#FF4040"],
];

export const rangeColorMapping = [
    {
        label: "1°C to 10°C",
        start: "1",
        end: "10",
        colors: colorMappingData[1],
    },

    {
        label: "11°C to 20°C",
        start: "11",
        end: "20",
        colors: colorMappingData[2],
    },

    {
        label: "21°C to 30°C",
        start: "21",
        end: "30",
        colors: colorMappingData[3],
    },
];

export const ColorMappingPrimaryXAxis = {
    valueType: "Category",
    majorGridLines: { width: 0 },
    title: "Months",
};

export const ColorMappingPrimaryYAxis = {
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    labelFormat: "{value}°C",
    title: "Temperature",
};

export const FinancialPrimaryXAxis = {
    valueType: "DateTime",
    minimum: new Date("2016, 12, 31"),
    maximum: new Date("2017, 9, 30"),
    crosshairTooltip: { enable: true },
    majorGridLines: { width: 0 },
};

export const FinancialPrimaryYAxis = {
    title: "Price",
    minimum: 100,
    maximum: 180,
    interval: 20,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
};

export const LinePrimaryXAxis = {
    valueType: "DateTime",
    labelFormat: "y",
    intervalType: "Years",
    edgeLabelPlacement: "Shift",
    majorGridLines: { width: 0 },
    background: "white",
};

export const LinePrimaryYAxis = {
    labelFormat: "{value}%",
    rangePadding: "None",
    minimum: 0,
    maximum: 100,
    interval: 20,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
};

export const customersGrid = [
    { type: "checkbox", width: "50" },
    {
        headerText: "Name",
        width: "150",
        template: customerGridImage,
        textAlign: "Center",
    },
    {
        field: "ProjectName",
        headerText: "Project Name",
        width: "150",
        textAlign: "Center",
    },
    {
        field: "Status",
        headerText: "Status",
        width: "130",
        format: "yMd",
        textAlign: "Center",
        template: customerGridStatus,
    },
    {
        field: "Weeks",
        headerText: "Weeks",
        width: "100",
        format: "C2",
        textAlign: "Center",
    },
    {
        field: "Budget",
        headerText: "Budget",
        width: "100",
        format: "yMd",
        textAlign: "Center",
    },

    {
        field: "Location",
        headerText: "Location",
        width: "150",
        textAlign: "Center",
    },

    {
        field: "CustomerID",
        headerText: "Customer ID",
        width: "120",
        textAlign: "Center",
        isPrimaryKey: true,
    },
];

export const employeesGrid = [
    {
        headerText: "Employee",
        width: "150",
        template: gridEmployeeProfile,
        textAlign: "Center",
    },
    { field: "Name", headerText: "", width: "0", textAlign: "Center" },
    {
        field: "Title",
        headerText: "Designation",
        width: "170",
        textAlign: "Center",
    },
    {
        headerText: "Country",
        width: "120",
        textAlign: "Center",
        template: gridEmployeeCountry,
    },

    {
        field: "HireDate",
        headerText: "Hire Date",
        width: "135",
        format: "yMd",
        textAlign: "Center",
    },

    {
        field: "ReportsTo",
        headerText: "Reports To",
        width: "120",
        textAlign: "Center",
    },
    {
        field: "EmployeeID",
        headerText: "Employee ID",
        width: "125",
        textAlign: "Center",
    },
    {
        headerText: "exampleCol",
        width: "150",
        template: gridEmployeeTeachers,
        textAlign: "Center",
    },
];

export const booksGrid = [
    {
        headerText: "id",
        width: "150",
        field: "id",
        textAlign: "Center",
        isPrimaryKey: true,
    },
    { field: "desc", headerText: "desc", width: "150", textAlign: "Center" },
    { field: "title", headerText: "title", width: "170", textAlign: "Center" },
];

export const viewButton = (props) => (
    <div>
        <NavLink to={`/teacherDetails/${props._id}`} className="decoraction-none btn btn-outline-danger" id={props._id} >
            View 
        </NavLink>
    </div>
  );
  
  export const viewButtonTwo = (props) => (
    <div>
        <NavLink to={`/studentDetails/${props._id}`}  className="decoraction-none btn btn-outline-danger" id={props._id} >
            View 
        </NavLink>
    </div>
  );
  export const viewButtonThree = (props) => (
    <div>
        <NavLink to={`/Report/${props._id}`}  className="decoraction-none btn btn-outline-danger" id={props._id} >
            View 
        </NavLink>
    </div>
  );
export const viewClassButton = (props) => (
    <div>
           <NavLink  to={`/adminCourse/${props._id}`} className="decoraction-none btn btn-outline-danger" id={props._id} >
            View 
        </NavLink>
    </div>
  );

  let countryElem
  let countryObj
  let TeacherData=[]
  // ////////////////////////////////////////////////
export  const filterTeacherData = ()=>{
      get("http://localhost:8000/admin/getAllTeachers").then((newData) => {
       let filterData= newData.filter((teacher)=>{
            return teacher.subject === null || teacher.subject === "" || teacher.subject === undefined
        })
        TeacherData=[]
            TeacherData.push(...filterData)
    
      });
  }
  filterTeacherData()
     const countryParams = {
         create: () => {
             countryElem = document.createElement('input');
             return countryElem;
          },
          destroy: () => {
              countryObj.destroy();
            },
          read: () => {
              return countryObj.value;
          },
          write: () => {
              countryObj = new DropDownList({
                  dataSource: new DataManager(TeacherData),
                  fields: {value:'_id',text:'name' },
                  floatLabelType: 'Never',
                  placeholder: 'Select Teacher'
              });
              countryObj.appendTo(countryElem);
          }
        };
// ظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظ
        let subjectElem
        let subjectObj
        let subjectData=[]
        // ////////////////////////////////////////////////
        get("http://localhost:8000/admin/getAllClasses").then((newData) => {
            const filter = newData.filter((clas)=>{
                return clas.teacher === null || clas.teacher===""  ||clas.teacher ===undefined 
            })
            subjectData.push(...filter);

        });
     const subjectParam  = {
         create: () => {
            subjectElem = document.createElement('input');
             return  subjectElem;
          },
          destroy: () => {
            subjectObj.destroy();
            },
          read: () => {
              return subjectObj.value;
          },
          write: () => {
            subjectObj = new DropDownList({
                  dataSource: new DataManager(subjectData),
                  fields: {value:'_id',text:'title' },
                  floatLabelType: 'Never',
                  placeholder: 'Select subject'
              });
              subjectObj.appendTo( subjectElem);
          }
        };
        
// ظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظ
        let ParentElem
        let ParentObj
        let ParentData=[true,false]
        // ////////////////////////////////////////////////
        // get("http://localhost:8000/admin/getAllParents").then((newData) => {
        //     ParentData.push(...newData);
        // });
        // console.log(ParentData);
     const ParentParam   = {
         create: () => {
            ParentElem = document.createElement('input');
             return  ParentElem;
          },
          destroy: () => {
            ParentObj.destroy();
            },
          read: () => {
              return ParentObj.value;
          },
          write: () => {
            ParentObj = new DropDownList({
                  dataSource: new DataManager(ParentData),
                  fields: {value:'_id',text:'Parent_name' },
                  floatLabelType: 'Never',
                  placeholder: 'set status'
              });
              ParentObj.appendTo( ParentElem);
          }
        };
        let classElem
        let classObj
    const schoolClasses = ["1st Elementary level","2nd Elementary level","3rd Elementary level","4th Elementary level","5th Elementary level","6th Elementary level","1st Prepartory level","2nd Prepartory level","3rd Prepartory level","1st Secondary level","2nd Secondary level","3rd Secondary level"]
    const classParams = {
          create: () => {
            classElem = document.createElement('input');
              return classElem;
          },
          destroy: () => {
            classObj.destroy();
          },
          read: () => {
              return classObj.value;
          },
          write: () => {
            classObj = new DropDownList({
                  dataSource: new DataManager(schoolClasses),
                  floatLabelType: 'Never',
                  placeholder: 'Select school level'
              });
              classObj.appendTo(classElem);
          }
      };
        let genderElem
        let genderObj
    const gender = ["male","female"]
    const gendersParams = {
          create: () => {
            genderElem = document.createElement('input');
              return genderElem;
          },
          destroy: () => {
            genderObj.destroy();
          },
          read: () => {
              return genderObj.value;
          },
          write: () => {
            genderObj = new DropDownList({
                  dataSource: new DataManager(gender),
                  floatLabelType: 'Never',
                  placeholder: 'Select gender'
              });
              genderObj.appendTo(genderElem);
          }
      };
      const birthDate = new Date()
      export const birthDateParams = {
        params: {
          max: birthDate,
          value: birthDate,
        },
      };
  export const teachersGrid = [
    { field: "name", headerText: "Teacher Name", width: "170", textAlign: "Center" },
    { field: "email", headerText: "Email", width: "170", textAlign: "Center" },
    { field: "phone", headerText: "Phone", width: "170", textAlign: "Center" },
    {
        field: "gender",
        headerText: "gender",
        width: "120",
        textAlign: "Center",
        editType:'dropdownedit',
        edit : gendersParams 
    },
    { field:"DOB", headerText: "DOB", width: "170", textAlign: "Center" ,editType:'datePickerEdit', edit:birthDateParams },
    {
        field: "subject.title",
        headerText: "Subject",
        width: "170",
        textAlign: "Center",
        editType:'dropdownedit',
        edit : subjectParam  ,
    },
    { headerText: "view",textAlign: "Center" ,width: "100", template: viewButton ,isPrimaryKey: true },
];
export const studentsGrid = [
    { field: "name", headerText: "Student Name", width: "170", textAlign: "Center" },
    // {
    //     field: "Parent.Parent_name",
    //     headerText: "Parent",
    //     width: "170",
    //     textAlign: "Center",
    //     editType:'dropdownedit',
    //     edit : ParentParam  ,
    // },
    { field: "email", headerText: "Email", width: "170", textAlign: "Center" },
    { field: "phone", headerText: "Phone", width: "170", textAlign: "Center"},
    { field: "level", headerText: "Class", width: "170", textAlign: "Center",editType:'dropdownedit', edit : classParams},
    {field: "gender",headerText: "gender",width: "170",textAlign: "Center",   editType:'dropdownedit', edit : gendersParams },
    { field: "DOB", headerText: "Birth date", width: "170", textAlign: "Center" ,editType:'datePickerEdit', edit:birthDateParams },
    { headerText: "view",textAlign: "Center" ,width: "100", template: viewButtonTwo ,isPrimaryKey: true},
];
export const integerParams = {
    params: {
      decimals: 0,
      format: "C2",
      min: 0,
      validateDecimalOnType: true,
    },
  };
  const defultValue = new Date();
  const minDate = new Date();
  const endminDate =new Date()
  endminDate.setDate(endminDate.getDate()+14)
  const endDate =  new Date()
  endDate.setDate(endDate.getDate()+15)
export const dateParams = {
    params: {
      min: minDate,
      value:defultValue
    },
  };
export const endDateParams = {
    params: {
    min: endminDate,
    value:endDate
    },
  };
export const classGrid = [
    {
        headerText: "Course Title",
        width: "170",
        field: "title",
        textAlign: "Center",
    },
    { field: "price", headerText: "Price", width: "170", textAlign: "Center" ,editType:'numericEdit', format:"C2",edit :integerParams},
    { field: "level", headerText: "Class", width: "170", textAlign: "Center",editType:'dropdownedit', edit : classParams},
    {field: "teacher.name",headerText: "Teacher",width: "170",textAlign: "Center", editType:'dropdownedit',edit : countryParams,
    },
    { field: "startDate", headerText: "Start Date", width: "170", textAlign: "Center", editType:'datePickerEdit', edit:dateParams},
    { field: "endDate", headerText: "End Date", width: "170", textAlign: "Center", editType:'datePickerEdit',edit:endDateParams},
    { headerText: "view",textAlign: "Center" ,width: "170", template: viewClassButton , isPrimaryKey: true,},
];

export const links = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'ecommerce',
          icon: <FiShoppingBag />,
        },
      ],
    },
  
    {
      title: 'Pages',
      links: [
        {
          name: 'orders',
          icon: <AiOutlineShoppingCart />,
        },
        {
          name: 'employees',
          icon: <IoMdContacts />,
        },
        {
          name: 'customers',
          icon: <RiContactsLine />,
        },
      ],
    },
    {
      title: 'Apps',
      links: [
        {
          name: 'calendar',
          icon: <AiOutlineCalendar />,
        },
        {
          name: 'kanban',
          icon: <BsKanban />,
        },
        {
          name: 'editor',
          icon: <FiEdit />,
        },
        {
          name: 'color-picker',
          icon: <BiColorFill />,
        },
      ],
    },
    {
      title: 'Charts',
      links: [
        {
          name: 'line',
          icon: <AiOutlineStock />,
        },
        {
          name: 'area',
          icon: <AiOutlineAreaChart />,
        },
  
        {
          name: 'bar',
          icon: <AiOutlineBarChart />,
        },
        {
          name: 'pie',
          icon: <FiPieChart />,
        },
        {
          name: 'financial',
          icon: <RiStockLine />,
        },
        {
          name: 'color-mapping',
          icon: <BsBarChart />,
        },
        {
          name: 'pyramid',
          icon: <GiLouvrePyramid />,
        },
        {
          name: 'stacked',
          icon: <AiOutlineBarChart />,
        },
      ],
    },
  ];
  export const attendanceGrid = [
    { field: "_id.name", headerText: "Student Name", width: "170", textAlign: "Center",  allowEditing:false},
    { field: "_id.email", headerText: "Student Email", width: "170", textAlign: "Center", allowEditing:false},
    { field: "_id.phone", headerText: "Student Phone", width: "170", textAlign: "Center", allowEditing:false},
    { field: "attendenceStuts", headerText: "Attendance Status", width: "100", textAlign: "Center" ,editType:'dropdownedit', edit:ParentParam},
    
];
export const attendanceReprtGrid = [
    { field: "_id", headerText: "Report ID", width: "170", textAlign: "Center",isPrimaryKey:true , allowEditing:false},
    { field: "reportDate", headerText: "subject data", width: "170", textAlign: "Center",  allowEditing:false},
    { field: "teacher.name", headerText: "teacher", width: "170", textAlign: "Center", allowEditing:false},
    { field: "subject.title", headerText: "Subject", width: "170", textAlign: "Center", allowEditing:false},
    { headerText: "view",textAlign: "Center" ,width: "100", template: viewButtonThree ,isPrimaryKey: true},
];