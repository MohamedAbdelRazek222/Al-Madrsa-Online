import React, { useEffect } from "react";
import Cards from "../../components/Cards";
import course1 from "./../../assets/edu4.jpeg";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import breaks from "./../../assets/333pn.png";
import lamp from "./../../assets/pg77777.png"
import paper from "./../../assets/pg8888.png"
import { useSelector, useDispatch } from 'react-redux'
import { getAllclass } from "../../../Dashboard/store/reducer/classSlice";
import { getAllTeachers } from "../../../Dashboard/store/reducer/TeacherSlice";
import jwt_decode from "jwt-decode";

export default function MyCourses() {

const {classData}=useSelector(state=>state.classcontx)
const dispatch=useDispatch()
const token= sessionStorage.getItem("token")
if (token) {
    const decoded = jwt_decode(token);
   var {id}=decoded   
}

const  MyCuorseData =classData.filter((data)=>{
    for (let index = 0; index < data.students.length; index++) {
        const element = data.students[index];
        if (element._id===id) {
            return data 
        }   
    }
 })
 console.log(MyCuorseData);

useEffect(()=>{
dispatch(getAllclass())
dispatch(getAllTeachers())
},[])

  return (
    <>

    <section className="courseSection mb-5 ">

             <img className="col-12 flex justify-content-center items-center relative" src={paper} alt="" />
      <div className="container corsesSection">
        <div className="row">
          <div className="flex justify-center items-center my-5 ">
            <h1 className="relative text-center  ">
            <span className="text-lower-left">My</span> <span className="text-lower-right">COURSES</span>
            </h1>
          

          </div>

          <div className="row">
      
{MyCuorseData&& MyCuorseData.map((course)=>{



return  <Cards cardCom={course}  key={course._id} />



})}


        </div>
  

  
        </div>
      </div>
    </section>

 

  </>
  );
}
