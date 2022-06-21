import React, { useState } from 'react'
import Todo from './Todo'

import "./TodoApp.css"

const TodoApp = () => {

  const [title, setTitle] = useState("")
  const [todos, setTodos] = useState([])

  // Verifico si existe algun cambio en el input del form para setearlo en mi estado title
  function handleChange(e) {
    let value = e.target.value
    setTitle(value)
  }

  // Manejo del evento submit del form
  function handleSubmit(e) {
    // Evito que la pagina recargue luego de hacer submit
    e.preventDefault()

    // Creo un modelo de objeto para representar cada tarea
    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false
    }

    // Realizo una copia del arreglo de tareas
    const temp = [...todos]
    // Agrego al final de mi arreglo la nueva tarea
    temp.push(newTodo)

    // Seteo los nuevos cambios en mi estado todo (voy añadiendo tareas)
    setTodos(temp)

    // Seteo a una cadena vacia el estado title y el value del input
    setTitle("")
  }

  // Funcion pasada por props. Se encarga de actualizar el valor de cada tarea
  function handleUpdate(id, value) {
    // Realizo una copia del arreglo de tareas
    const temp = [...todos]
    // Recorro el arreglo de tareas para buscar la tarea con el id que se quiere actualizar
    const item = temp.find((item) => item.id === id)
    // Actualizo por el nuevo valor recibido
    item.title = value
    // Seteo el nuevo arreglo de tareas
    setTodos(temp)
  }

  // Funcion pasada por props. Se encarga de eliminar una tarea
  function handleDelete(id) {
    // Recorro el arreglo de tareas para filtrar la tarea con el id que se quiere eliminar
    const temp = todos.filter(todo => todo.id !== id)
    // Seteo el nuevo arreglo de tareas
    setTodos(temp)
  }


  return (
    <div className='todoContainer'>
      <form className='todoForm' onSubmit={handleSubmit}>
        <input className='inputForm' type="text" onChange={handleChange} value={title} />
        <input className='buttonForm' type="submit" onSubmit={handleSubmit} value="Add task" />
      </form>
      <div className="todosContainer">
        {
          // Recorro el arreglo de tareas y por cada una de ella renderizo un componente Todo
          todos.map(todo => (
            <Todo todo={todo} key={todo.id} onUpdate={handleUpdate} onDelete={handleDelete} />
          ))
        }
      </div>
    </div>
  )
}

export default TodoApp