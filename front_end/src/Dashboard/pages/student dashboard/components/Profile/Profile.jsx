import React from 'react'
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';import { Outlet, NavLink, useLocation } from 'react-router-dom';
// import { creatParent,creatChildren,getChildren,getParent } from './../../../store/reducer/ParentSlice';
// import { useEffect } from 'react';
// import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllStudents } from '../../../../store/reducer/StudentSlice';
import { useEffect } from 'react';
import { setStudentProfileAfterLggIn } from './../../../../store/reducer/StudentSlice';
import jwt_decode from "jwt-decode";


export default function Profile() {
    const token= sessionStorage.getItem("token")
    const decoded = jwt_decode(token);
    const {id}=decoded
   const  dispatch =useDispatch()
    const {StudentProfile}= useSelector(
        (state) => state.Studentcontx
      );
      useEffect(()=>{
        dispatch(getAllStudents())
        dispatch(setStudentProfileAfterLggIn(id))
      },[])
      console.log(StudentProfile);
  return (
    <>
<div className="max-w-sm w-full lg:max-w-full lg:flex py-6" style={{height:"450px"}}>
  <div className="lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{backgroundImage: `url(${StudentProfile?.profile_image})`,height:"400px",width:"400px" }}title="Woman holding a mug">
  </div>
  <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
    <div className="mb-2">
      <p className="text-sm text-gray-600 flex items-center">
        <svg className="fill-current text-red-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
        </svg>
        Members only
      </p>
      <div className="text-gray-900 font-bold text-xl mb-2">{StudentProfile?.name}</div>
      <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat non aliquam rerum eius omnis ipsum cumque fuga inventore adipisci ea. exercitationem praesentium nihil.</p>
    <div className="px-6">
    <span className="inline-block bg-gray-200 rounded-full px-3 my-5 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Phone : {StudentProfile?.phone}</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 my-5 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Email :{StudentProfile?.email}</span>
  </div>
    </div>
    {/* {
        myLocation==="/Parent/edit" ? null :
        <NavLink to={"/Parent/edit"}>
    <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
        Edit my data 
    </button>
    </NavLink>
    } */}
    {/* {
      isUpdated &&  <button className="bg-transparent hover:bg-green-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
       data updated successfuly 
  </button>
    } */}
  </div>
</div>
    </>

  )
}
