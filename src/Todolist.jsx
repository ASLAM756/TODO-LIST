import React, { useState } from 'react'
import './Todolist.css';
const Todolist = () => {
    const [todos,setTodos]=useState([])
    const [inputValues,setInputValues]= useState(''); 
    
    const [editMode,setEditMode]=useState(false);
    const[editId,setEditId]=useState(null);
    const [editValues,setEditValues]=useState('');

  

    const addTodo=()=>{
        if(inputValues.trim()!==''){
            const newTodo ={
                id: new Date().getTime(),
                text: inputValues,
            }
            setTodos([...todos,newTodo]);
            setInputValues('')

        }
    }

    const deleteTodo=(id)=>{
        const updateTodos = todos.filter((todo)=> todo.id !== id);
        setTodos(updateTodos)
    }
    const enterEditMode =(id,text)=>{
        setEditMode(true)
        setEditId(id)
        setEditValues(text) 
    }
    const updateTodos=()=>{
        const updateTodos=todos.map((todo)=>{
           if (todo.id === editId){
             return{ ...todo, text: editValues};
           }
            return todo;
        });
         setTodos(updateTodos)
         setEditMode(false)
         setEditId(null)
         setEditValues('')
       


    }
    

  return (
    <div className='listcontainer'>
        <h2>ToDo List</h2>
        <input type="text" value={inputValues}
        onChange={(e)=> setInputValues(e.target.value)}/>
        {
           editMode ? (
        <div className='listpage'>
           <input
             type="text"
             value={editValues}
             onChange={(e) => setEditValues(e.target.value)}   />
          <button onClick={ updateTodos}>Update</button>
        </div>  ) :
           (<button onClick={addTodo}>Add</button> )
        }
        <ul>
           {todos.map((todo)=>(
            <li key={todo.id}>
                {todo.text}
                <button onClick={()=> deleteTodo(todo.id)}>Delete</button>
                <button onClick={()=> enterEditMode(todo.id,todo.text)}>Edit</button>
            </li>
           ))}
        </ul>
    </div>
  )
}

export default Todolist