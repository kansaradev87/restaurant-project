import { useState } from 'react'
import './App.css'
import NavBar from './components/common/NavBar'
import MenuBar from './components/common/MenuBar'
import DarkModeToggle from './components/common/DarkModeToggle'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="main">
      <NavBar />
    </div>
    </>
  )
}

export default App
