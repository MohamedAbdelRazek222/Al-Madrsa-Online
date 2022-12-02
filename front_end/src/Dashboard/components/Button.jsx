import React from 'react'

const Button = ({bgColor,color,size,text,borderRadius, onClick = () => {}}) => {
  return (
    <button type='button' onClick={onClick} style={{backgroundColor:bgColor,color,borderRadius}} className={`text-${size} p-3 hover:drop-shadow-xl m-1`}>
      {text}
    </button>
  )
}

export default Button