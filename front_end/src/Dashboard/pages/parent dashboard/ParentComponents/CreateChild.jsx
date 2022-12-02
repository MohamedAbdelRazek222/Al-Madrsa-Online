import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { creatParent,creatChildren,getChildren,getParent } from './../../../store/reducer/ParentSlice';

export default function CreateChild() {
    const { ParentData,childData,isLoading,error,isUpdated}= useSelector(
        (state) => state.Parentcontx
      );
      const dispatch = useDispatch();
  return (
    <div>CreateChild</div>
  )
}
