import React from 'react'
//all states are actually just JS objects
//Also, JSX is basically a mix between JS and HTML

//input (type text or checkbox or whatever all defined already by HTML)
//in this case, checked defines the thing
//anything inside the curly brackets is JS code, that's how you distinguish it
export default function Todo({todo}){
  return(
    <div>
      <label>
        <input type= "checkbox" checked = {todo.complete} />
        {todo.name}
      </label>
    </div>
  )
}
