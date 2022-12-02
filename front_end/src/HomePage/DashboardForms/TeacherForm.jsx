import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { createTeacher } from '../../Dashboard/store/reducer/TeacherSlice';

export default function TeacherForm() {
    const {isAdmin}=useSelector(
        (state) => state.Teachercontx
      );
      const [data,setData]=useState({})
      const [err, setErr] = useState({});
      useEffect(()=>{
        setData({name:"hagras",email:"gedaaaa.foz@gmail.com",password:"010179dd278",DOB:"11/11/2020",gender:"male",phone:"01014579ddd8",teacher_subjects:"sss"})
    },[])
   const dispatch = useDispatch()
   const save =(e)=>{
    e.preventDefault()
    dispatch(createTeacher({data,isAdmin}))
   }

   const handleChange = (e) => {
     if (e.target.value==="") {
       setErr({...err,[e.target.id]:`${e.target.id} is required`})
     } else if(e.target.value.length<5) {
       setErr({...err,[e.target.id]:`${e.target.id} must be more than 5 letters`})}
     else{
       setData({...data,[e.target.id]:e.target.value})
       setErr({[e.target.id]:""})
     }
     }

  return (
    <>
<div className="mt-10 sm:mt-0 justify-center">
  <div className="md:grid-8 md:grid-cols-3 md:gap-6 mx-20">
    <div className="mt-5 md:col-span-2 md:mt-0">
    <h1 className='font-black my-3 text-center'>Teacher Info</h1>    
      <form onSubmit={save} >
        <div className="overflow-hidden shadow sm:rounded-md border-indigo-500">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">name</label>
                <input onChange={handleChange} type="text" name="name" id="name" autoComplete="given-name" className="mt-1 block w-full rounded-md border-indigo-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="Password" className="block text-sm font-medium text-gray-700">Password</label>
                <input onChange={handleChange} type="Password" name="Password" id="Password" autoComplete="given-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>
              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <input onChange={handleChange} type="text" name="email" id="email" autoComplete="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>

              <div className="col-span-6">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                <select onChange={handleChange} id="role" name="role" autoComplete="country-name" className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                  <option>Teacher</option>
                  <option>Student</option>
                  <option>Parent</option>
                </select>
              </div>

              <div className="col-span-4">
                <label htmlFor="DOB" className="block text-sm font-medium text-gray-700">Date of birth</label>
                <input onChange={handleChange} type="date" name="DOB" id="DOB" autoComplete="street-address" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>
              <div className="col-span-6">
                <label htmlFor="subjects" className="block text-sm font-medium text-gray-700">Subjects</label>
                <select onChange={handleChange} id="subjects" name="subjects" autoComplete="country-name" className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" multiple>
                  <option value="math" >Math</option>
                  <option value="Ar">Arabic</option>
                  <option value="eng">Engilsh</option>
                </select>
                {/* {load from database} */}
              </div>
              <div className="col-span-8 ">
<div className="main flex border rounded-full overflow-hidden m-4 select-none">
  <div className="title py-3 my-auto px-5 bg-blue-500 text-white text-sm font-semibold mr-3">Gender</div>
  <label className="flex radio p-2 cursor-pointer">
    <input  onChange={handleChange} className="my-auto transform scale-125" value="Male" type="radio" name="sfg" />
    <div className="title px-5">male</div>
  </label>

  <label className="flex radio p-2 cursor-pointer">
    <input onChange={handleChange} className="my-auto transform scale-125" value="FeMale" type="radio" name="sfg" />
    <div className="title px-5">female</div>
  </label>
</div>
              </div>

         </div>
          </div>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-3 gap-6">
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile photo</label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
          </div>
        </div>
        </div>
      </form>
    </div>
  </div>
</div>
    </>
  )
}
