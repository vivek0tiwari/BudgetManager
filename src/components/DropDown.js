import React from 'react';
export const DropDown =({title, data, onChange})=>{
    return <div> 
      <span>{title}</span> :{" "}
      <select onChange={onChange}>
        {data.map((label) => {
                  return <option key={label}>{label}</option>;
                })}
      </select>
    </div>
}