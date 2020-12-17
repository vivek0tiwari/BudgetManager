import React from 'react';
import {Cell} from './Cell'
export const Row = ({config, row, render, onDelete, onEdit,highlightedId, ...rest})=>{
    const rows = config.map(header=>{
        const { label, render, key } = header
        return <Cell data={row[key]} key={row[key]}/>
    })
    const EditButton = <button onClick={onEdit && onEdit.bind(this, row)} key='row-edit'>Edit</button>
    const DeleteButton = <button onClick={onDelete && onDelete.bind(this, row)} key='row-delete'>Delete</button>
    const className = highlightedId && highlightedId.includes(row.id)?'highlightedBG':''
    return  <div className={`row ${className}`}>
        {[...rows, EditButton, DeleteButton]}
    </div>
}