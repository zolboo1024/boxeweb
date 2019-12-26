import React from 'react'
import Todo from './Todo' //'./filename' for anyfile within the same
//directory that ends with .js

export default function TodoList({todoListFromApp}){
  //if lets say example object is an array,
  //example.map(currentElement => {dosomething to currentElement}) returns
  //a new array of which the elements are modified version of each element in
  //the original array
  //each child in a list in this case, return<Todo todo={todo}, should have
  //a unique key prop.
  //Also, when you call a certain component from within another component,
  //and pass down the required parameters, you are making a "child".
  return(
    <div>
      {todoListFromApp.map(todo => {
        return <Todo key= {todo.id} todo={todo} />
      })}
    </div>
  )
}
