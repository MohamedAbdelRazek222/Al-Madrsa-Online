import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { editParent } from '../../../store/reducer/ParentSlice';
import { useState } from 'react';

export default function EditParent() {
    const {ParentId,ParentData}= useSelector(
        (state) => state.Parentcontx
      );
      const navigate= useNavigate()
      const dispatch=useDispatch();
      const [mydata, setmydata] = useState({});
      const [err, setErr] = useState({});

      const handleChange = (e) => {
        if (e.target.value==="") {
          setErr({...err,[e.target.id]:`${e.target.id} is required`})
        } else if(e.target.value.length<5) {
          setErr({...err,[e.target.id]:`${e.target.id} must be more than 5 letters`})}
        else{
          setmydata({...mydata,[e.target.id]:e.target.value})
          setErr({[e.target.id]:""})
        }
        }
        let display=async(e)=>{
            e.preventDefault()
             dispatch(editParent({ParentId,mydata})) 
             navigate(-1) 
         };
  return (
   <>
<form className="w-full max-w-lg m-6" onSubmit={display}>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="Parent_name">
        Name
      </label>
      <input onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:bg-white" id="Parent_name" type="text" placeholder={ParentData.Parent_name}/>
      {
        err.Parent_name||<p className="text-red  text-xs italic">{err.Name}</p>
    } 
    </div>
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone_number">
        Phone Number
      </label>
      <input onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:bg-white" id="phone_number" type="phone" placeholder={ParentData.phone_number}/>
      {
        err.phone_number||<p className="text-red-500 text-xs italic">{err.Name}</p>
    } 
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
        Email
      </label>
      <input onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight  focus:bg-white focus:border-gray-500" id="email" type="email" placeholder={ParentData.email}/>
      {
        err.email||<p className="text-red-500 text-xs italic">{err.Name}</p>
    } 
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="Password">
        Password
      </label>
     <input onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight  focus:bg-white focus:border-gray-500" id="Password" type="Password" placeholder="******************"/>
     {
        err.Password||<p className="text-red-500 text-xs italic">{err.Name}</p>
    } 
      <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
    </div>
  </div>
 
    <input type="submit" className="bg-transparent hover:bg-green-500 mx-8 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
    </input>
  <NavLink to={"/Parent"}>
    <button type="submit" className="bg-transparent hover:bg-red-500 mx-8 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
        Dissmiss 
    </button>
    </NavLink>
</form>
   </>
  )
}
