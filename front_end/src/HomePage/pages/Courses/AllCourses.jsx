import React from "react";
import CourseBanner from "./CourseBanner";
import { NavLink } from "react-router-dom";
import breaks from "./../../assets/333pn.png";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSelector } from 'react-redux';

export default function AllclassData() {
 
    const {classData}=useSelector(state=>state.classcontx)
    const {StudentProfile}=useSelector(state=>state.Studentcontx)
 const classDataFilter=classData.filter((course)=>{
        return course.level===StudentProfile.level
    })

  return (
    <>
      <CourseBanner />
      <div className="breaksColors conatiner-fluid flex justify-center">


<img  alt="....." className="breaksColorsImg " src={breaks} />
<img alt="....." className="breaksColorsImg " src={breaks} />
<img  alt="....."className="breaksColorsImg " src={breaks} />
<img  alt="....."className="breaksColorsImg " src={breaks} />



      </div>
    <div className="container py-5">
    <h1 className="relative text-center ">
            <span className="text-lower-left">My </span> <span className="text-lower-right">classData</span>
            </h1>
          
      <div className="row">
        {classData &&
         classDataFilter.map((course) => (
            <div className="course my-3 col-10 m-auto d-md-flex bg-light rounded">
              <div className="col-md-2">
                <img alt="..." src={course.Image_url} className="col-12 rounded" />
              </div>

              <div className="col-md-7 px-4 pt-5">
                <h4>{course.title}</h4>
                <p>By {course?.teacher?.name}</p>
              </div>
              <div className="col-md-3 d-flex align-items-center">
                <button className="btn mx-4 themeColor">Details</button>
                <i className="bx bx-video fs-2 meetIcon"></i>
              </div>
            </div>
          ))}
      </div>
    </div>
  
  </>);
}
