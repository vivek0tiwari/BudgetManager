import React from 'react';
export const InputBox =({title, value, onChange,field, ...rest})=>{
    return <div> 
      <span>{title}</span> :{" "}
      <input type='text' value={value} onChange={onChange.bind(this,field )} {...rest} />
    </div>
}