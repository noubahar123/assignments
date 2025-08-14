import { useState } from 'react'

const ToDoItem = ({ todo, deleteTodo, toggleComplete, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newText, setNewText] = useState(todo.text)

  const handleSave = () => {
    editTodo(todo.id, newText)
    setIsEditing(false)
  }

  // Delete when clicking the whole item 
  const handleItemClick = () => {
    if (window.confirm(`Delete "${todo.text}"?`)) {
      deleteTodo(todo.id)
    }
  }

  return (
    <li
      className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm ring-1 ring-gray-100
                 cursor-pointer hover:bg-red-50 transition"
      onClick={handleItemClick}
    >
      
      <div className="flex items-center gap-4 flex-1" onClick={(e) => e.stopPropagation()}>
        {/* checkbox */}
        <input
          id={`todo-${todo.id}`}
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="h-6 w-6 accent-blue-600 border-2 border-blue-500 rounded"
          aria-label={`Mark "${todo.text}" as ${todo.completed ? 'not completed' : 'completed'}`}
        />

        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            className="flex-1 rounded-md border border-gray-300 px-2 py-1 md:py-2 md:text-lg"
            autoFocus
          />
        ) : (
          <label
            htmlFor={`todo-${todo.id}`}
            className={`flex-1 select-none md:text-lg ${
              todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
          >
            {todo.text}
          </label>
        )}
      </div>

      <div className="flex items-center gap-2 ml-3" onClick={(e) => e.stopPropagation()}>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="rounded-lg bg-green-600 px-3 py-1.5 text-white hover:bg-green-700 md:px-4 md:py-2"
            aria-label="Save edit"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => { setIsEditing(true); setNewText(todo.text) }}
            className="rounded-lg bg-yellow-500 px-3 py-1.5 text-white hover:bg-yellow-600 md:px-4 md:py-2"
            aria-label="Edit task"
          >
            Edit
          </button>
        )}

        {/* Delete button  */}
        <button
          onClick={() => deleteTodo(todo.id)}
          className="rounded-lg bg-red-600 px-3 py-1.5 text-white hover:bg-red-700 md:px-4 md:py-2"
          aria-label="Delete task"
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default ToDoItem