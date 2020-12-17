import React from 'react';
import {Cell} from './Cell'
export const Row = ({config, row, render, onDelete, onEdit, ...rest})=>{
    const rows = config.map(header=>{
        const { label, render, key } = header
        return <Cell data={row[key]} key={row[key]}/>
    })
    const EditButton = <button onClick={onEdit && onEdit.bind(this, row)} key='row-edit'>Edit</button>
    const DeleteButton = <button onClick={onDelete && onDelete.bind(this, row)} key='row-delete'>Delete</button>
    return  <div className={`row`}>
        {[...rows, EditButton, DeleteButton]}
    </div>
}