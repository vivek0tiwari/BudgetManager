import React from 'react';
import { Row } from './Row'
import { Cell } from './Cell'
export const Table = ({config, data, onDelete, onEdit})=>{
    const rows =  data.map(row=>{
        return <Row row={row} onDelete={onDelete} onEdit={onEdit} key={row.id} config={config}/>
    })
    const header = config.map(header=>{
        const { label, render, key } = header
        return <Cell data={label} key={`header#${label}`} className={'header'}/>
    })
return [<div className='row'>{[...header]}</div>, ...rows]
}