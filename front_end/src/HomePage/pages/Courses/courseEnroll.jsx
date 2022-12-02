import React from 'react'
import { get } from './../../../Dashboard/helpers/Crud';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function CourseEnroll() {
    const navigate= useNavigate()
    const Param =useParams()
    const {classId}=Param
    console.log(classId);
 get(`http://localhost:8000/student/${classId}`).then((newData) => {
    console.log(newData); 
    navigate("/course-details")
})
      
  return (
    <div>courseEnroll</div>
  )
}
