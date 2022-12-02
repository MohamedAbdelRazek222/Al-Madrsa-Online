import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllTeachers } from '../../store/reducer/TeacherSlice';
export default function AdminCourses() {
    let [show,setShow] =useState(false) 
const change =()=>{
    setShow(true)
}

    const {classData}=useSelector(state=>state.classcontx)
    console.log(classData);
    const {TeacherData}=useSelector(state=>state.Teachercontx)
    const Param = useParams()
    const dispatch = useDispatch()
    const {id}=Param
    console.log(id);
    const myClass = classData.filter((ele)=>ele?._id===id)
    const teacherToShow=TeacherData.filter((course)=>course?._id===myClass[0]?.teacher._id)
    console.log(teacherToShow);
    useEffect(()=>{
        dispatch(getAllTeachers())
    },[])
  return (
        <div className="container mx-auto my-5 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">
                <div className="w-full md:w-3/12 md:mx-2">
                    <div className="bg-white p-3 border-t-4 border-green-400">
                        <div className="image overflow-hidden">
                            <img className="h-auto w-full mx-auto"
                                src={myClass[0]?.Image_url ||"https://imgk.timesnownews.com/story/english.png"}
                                alt=""/>
                               {
                            show &&
                          <div >
                          <label className='text-blue-900' htmlFor="Image_url"> Update Course Image</label>
                          <input className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm py-2 text-center" name='Image_url' id='Image_url' type="file" />
                          </div>
                          }
                        </div>
                        <h1 className="text-gray-900 text-center font-bold text-xl leading-8 my-1">{myClass[0]?.title}</h1>
                    </div>
                </div>
                <div className="w-full md:w-9/12 mx-2 h-64">
                    <div className="bg-white p-3 shadow-sm rounded-sm">
                        <div className="flex items-center space-x-2 font-bold text-blue-900 leading-8">
                            <span clas="text-green-500">
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <span className="tracking-wide">Detailes</span>
                        </div>
                        <form className="text-gray-700" onChange={change}>
                            <div className="grid md:grid-cols-2 text-sm">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Course title</div>
                                    <div className="px-4 py-2"><input type="text" name='title' id='title' placeholder='' defaultValue={myClass[0]?.title}/></div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">level</div>
                                    <div className="px-4 py-2"><input type="text" name='class' id='class'  placeholder='' defaultValue={myClass[0]?.level}/></div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold" > Start Date</div>
                                    <div className="px-4 py-2">
                                    <input  placeholder='' defaultValue={myClass[0].startDate.split("T")[0]} type="date" name="startDate" id="startDate"  />
                                                </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold"> End Date</div>
                                    <input  placeholder='' defaultValue={myClass[0].endDate.split("T")[0]} type="date" name="endDate" id="endDate"  />
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Price</div>
                                    <input className="px-4 py-2 font-semibold" type="text" name='price' id=''  placeholder='' defaultValue={myClass[0]?.price} />
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">subject teacher</div>
                                    <select className="px-4 py-2 font-semibold" type="text" name='teacher' id=''   >
                                        {  
                                            <option selected value={teacherToShow[0]?._id}>{teacherToShow[0]?.name}</option>
                                        }
                                        {
                                                TeacherData.map((teacher)=>{
                                                    if (teacher._id!== id) {
                                                        return(
                                                            <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                                                        )
                                                    }
                                                    
                                                }
                                                )

                                        }
                                    </select>
                                </div>
                            </div>
                        </form>
                        {
                    
                    show &&<button type='submit'
                    className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">submit edit</button>
                    }
                    </div>
                </div>
            </div>
        </div>
  )
}
