import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';


export default function ShowStudent(props) {
    const {childData,isUpdated}= useSelector(
        (state) => state.Parentcontx
      );
      const param=useParams()
      console.log(param);
      const{id}=param
      console.log(id);
      const Location =useLocation()
       const myId=  Location.search.split("?")[1]
       const myData = childData.filter((child)=>{
        return child._id ===myId
       })
  return (
    <>
<div className="max-w-sm w-full lg:max-w-full lg:flex py-6" style={{height:"450px"}}>
  <div className="lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{backgroundImage: "url('https://images.freeimages.com/images/large-previews/e65/boy-1522835.jpg')",height:"400px",width:"400px" }}title="Woman holding a mug">
  </div>
  <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
    <div className="mb-2">
      <p className="text-sm text-gray-600 flex items-center">
        <svg className="fill-current text-red-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
        </svg>
        Members only
      </p>
      <h1 className="text-gray-900 font-bold text-xl mb-2">{myData[0].name}</h1>
      <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat non aliquam rerum eius omnis ipsum cumque fuga inventore adipisci ea. exercitationem praesentium nihil.</p>
    <div className="px-6">
    <span className="inline-block bg-gray-200 rounded-full px-3 my-5 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Phone : </span>
    <span className="inline-block bg-gray-200 rounded-full px-3 my-5 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Email : </span>
  </div>
    </div>
        <NavLink to={"/Parent/edit"}>
    <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
        Edit my data 
    </button>
    </NavLink>
    {
      isUpdated &&  <button className="bg-transparent hover:bg-green-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
       data updated successfuly 
  </button>
    }
  </div>
</div>
    </>

  )
}
