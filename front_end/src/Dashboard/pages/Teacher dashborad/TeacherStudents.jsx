import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getAllclass } from "../../store/reducer/classSlice";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";

export default function TeacherStudents() {
    const token= sessionStorage.getItem("token")
    if (token){
        const decoded = jwt_decode(token);
        var {id}=decoded
    }
    const {classData}=useSelector(state=>state.classcontx)
    console.log(classData);
    const classdata= classData.filter((classitem)=>{
      return  classitem.teacher._id === id 
    })
    const myData = classdata[0]?.students
    console.log(myData);
    const dispach = useDispatch()
    useEffect(()=>{
        dispach(getAllclass())
    },[])
  return (
    <div className="myStudents vh-100 py-5 bg-light">
      <h2 className="text-center mb-5">Students</h2>
      <div className="container">
      <div className="row">
  
            {
                myData?.length === 0 ?   <Card className="text-center" style={{ width: "70rem" }}>

                <Card.Body >
                  <Card.Title>Sorry</Card.Title>
                  <Card.Text>
                   no Students registerd yet 
                  </Card.Text>
                </Card.Body>
              </Card>
            
         : myData?.map((student)=>{
         return ( 
            <div className="col-md-4 text-center p-2" key= {student._id}>
         <Card className="px-5">
            <Card.Img 
             className="w-100 h-50 rounded-full"
              variant="top"
              src= {student.profile_image ||  "https://images.unsplash.com/photo-1629872430082-93d8912beccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"}
            />
            <Card.Body className="text-center">
              <Card.Title>{student.name}</Card.Title>
              <div className="row">
                <div className=" col-12 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">{student.phone}</div>
                <div className="h-20 col-12 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">{student.email}</div>
              </div>
            </Card.Body>
          </Card>
        </div>
          )
         })
}
      </div>
      </div>
    </div>
            
  );
}
