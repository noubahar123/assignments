import ToDoItem from './TodoItem.jsx'

const ToDoList = ({ todos, deleteTodo, toggleComplete, editTodo }) => {
  const active = todos.filter(t => !t.completed)
  const completed = todos.filter(t => t.completed)

  if (todos.length === 0) {
    return <p className="text-center text-gray-500">No tasks yet. Add one to get started!</p>
  }

  return (
    <div className="space-y-8">
      {/* Active */}
      <section>
        <div className="flex items-baseline justify-between mb-2">
          <h2 className="text-xl md:text-2xl font-semibold">Active</h2>
          <span className="text-sm text-gray-500">{active.length} task{active.length !== 1 ? 's' : ''}</span>
        </div>
        {active.length === 0 ? (
          <p className="text-gray-500">Nothing to do—nice!</p>
        ) : (
          <ul className="space-y-2">
            {active.map(todo => (
              <ToDoItem
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                toggleComplete={toggleComplete}
                editTodo={editTodo}
              />
            ))}
          </ul>
        )}
      </section>

      {/* Completed */}
      <section>
        <div className="flex items-baseline justify-between mb-2">
          <h2 className="text-xl md:text-2xl font-semibold">Completed</h2>
          <span className="text-sm text-gray-500">{completed.length} done</span>
        </div>
        {completed.length === 0 ? (
          <p className="text-gray-500">No completed tasks yet.</p>
        ) : (
          <ul className="space-y-2">
            {completed.map(todo => (
              <ToDoItem
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                toggleComplete={toggleComplete}
                editTodo={editTodo}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default ToDoList 
