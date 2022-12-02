import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { creatParent,creatChildren,getChildren,getParent } from './../../../store/reducer/ParentSlice';

export default function CreateParent() {
    const { ParentData,childData,isLoading,error,isUpdated}= useSelector(
        (state) => state.Parentcontx
      );
      const dispatch = useDispatch();
  return (
    <div>CreateParent</div>
  )
}
