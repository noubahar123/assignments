import React,{ useState } from 'react'
import Header from './components/Header.jsx'
import ToDoList from './components/TodoList.jsx'
import './App.css'

const App = () => {
  // State to manage lists
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")

  const addTodo = () => {
    if (!input.trim()) return
    setTodos(prev => [...prev, { id: Date.now(), text: input.trim(), completed: false }])
    setInput("")
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const editTodo = (id, newText) => {
    if (!newText.trim()) return
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text: newText.trim() } : t))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Wider on desktop, comfy on mobile */}
      <div className="mx-auto px-4 py-8 sm:px-6 md:px-10
                      max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
        <Header />

        <div className="flex gap-2 my-6">
          <input
            type="text"
            placeholder="Add new task..."
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2
                       md:py-3 md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          />
          <button
            onClick={addTodo}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white font-medium
                       hover:bg-blue-700 active:scale-[0.99]
                       md:px-6 md:py-3 md:text-lg"
            aria-label="Add task"
          >
            Add
          </button>
        </div>

        {/* One list component that renders Active and Completed sections */}
        <ToDoList
          todos={todos}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
          editTodo={editTodo}
        />
      </div>
    </div>
  )
}

export default App