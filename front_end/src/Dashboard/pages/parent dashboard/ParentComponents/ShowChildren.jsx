import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {getChildren} from './../../../store/reducer/ParentSlice';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function ShowChildren() {
    const {ParentId,childData}= useSelector(
        (state) => state.Parentcontx
      );
      const dispatch = useDispatch();
   
      useEffect(()=>{
        dispatch(getChildren(ParentId))
        console.log(childData);
      },[])

  return (
    <>
    {childData.map((child)=>{
        return (
            
<div key={child._id} className="w-full my-6 p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <div className="flex flex-col items-center pb-10">
        <img className="mb-3 w-50 h-24 rounded-full shadow-lg" src="https://images.freeimages.com/images/large-previews/e65/boy-1522835.jpg" alt="Bonnie_image"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{child.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
        <div className="flex mt-4 space-x-3 md:mt-6">
            <NavLink to={{pathname:"show",search:`${child._id}`}}>
             <p className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >view profile</p>
            </NavLink>
            <NavLink to={{pathname: "edit", userProps: {id:child._id }}}>
            <p className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Edit profile</p>
            </NavLink>
        </div>
    </div>
</div>
        )
            
    })
    }
    </>
  )
}
