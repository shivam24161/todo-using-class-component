import React, { useState } from 'react';
import { useReducer } from 'react';
const generateUniqueId = require('generate-unique-id');
const initialData={
        list:[],
};
const reducer=(state=initialData,action)=>{
    const todo_id = generateUniqueId({
        length: 4,
        useLetters: false
      });
    switch(action.type)
    {
        case "ADD_TODO":
            return {
                ...state,
                list:[...state.list,{id:todo_id,text:action.value}]
            }
        case "EDIT_TODO":
            const newList1=state.list.filter((i)=>i.id !== action.id)
            return {
               list:newList1
            }
        case "DELETE_TODO":
            const newList=state.list.filter((i)=>i.id !== action.id)
            return {
                list:newList
            }
        default: 
        return state
    }
}
const Todo = () => {
    const [value,setValue]=useState('');
    const [state1,dispatch]=useReducer(reducer,initialData);

    const editTodo=(index,id,text)=>{
        setValue(text)
        dispatch({type:"EDIT_TODO",index,id,value})
    }
  return (
    <>
    <div>
        <input type="text" value={value} onChange={(event)=>setValue(event.target.value)}/>
        <button onClick={()=>dispatch({type:"ADD_TODO",value},setValue(''))}>Add</button>
        {state1.list.map((i,index)=>{
            const id=i.id
            return(
                <>
                    <div>
                        <span>{i.id}</span>
                        <span>{i.text}</span>
                        <span><button onClick={()=>editTodo(index,id,i.text)}>Edit</button></span>
                        <span><button onClick={()=>dispatch({type:"DELETE_TODO",id})}>delete</button></span>
                    </div>
                </>
            )
        })}
    </div>
    
    </>
    )
}

export default Todo