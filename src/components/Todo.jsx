import React, { useState } from 'react'

const Todo = ({ todo, onUpdate, onDelete }) => {

  const [isEdit, setIsEdit] = useState(false)


  // COMPONENTE VISTA EDITAR
  function TodoFormEdit() {

    const [newValue, setNewValue] = useState(todo.title)

    function handleSubmitUpdate(e) {
      e.preventDefault()
    }

    // Verifico si existe algun cambio en el input del formEdit para setearlo en mi estado newValue
    function handleChangeUpdate(e) {
      let value = e.target.value
      setNewValue(value)
    }

    // Esta funcion se ejecuta cuando hacemos click en update, ejecuta la funcion recibida por props onUpdate y le manda el id y nuevo valor de la tarea que se quiere actualizar a TodoApp
    function handleClickUpdate() {
      onUpdate(todo.id, newValue)

      // Cambio el estado isEdit a false para volver a la vista normal
      setIsEdit(false)
    }

    return (
      <form className='todoFormEdit' onSubmit={handleSubmitUpdate}>
        <input className='inputForm' type="text" onChange={handleChangeUpdate} value={newValue} />
        <input className='button' type="submit" onClick={handleClickUpdate} value="Update" />
      </form>
    )
  }


  // COMPONENTE VISTA NORMAL
  function TodoElement() {
    return (
      <div className='todoInfo'>
        <span className='todoTitle'>{todo.title}</span>
        <button className='button' onClick={() => setIsEdit(true)}>Edit</button>
        <button className='buttonDelete' onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    )
  }

  // ------------------------------------------------------------------------------------------

  return (
    <div className='todo'>
      {
        // Corroboro si se esta en modo editar o no
        isEdit ? <TodoFormEdit /> : <TodoElement />
      }
    </div>
  )
}

export default Todo
