import React from 'react';
export const Cell = ({data, render, ...rest})=>{
    return  <div className={`cell ${rest.className}`}>{data||''}</div>
}