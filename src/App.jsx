import { useState } from 'react'
import './App.css'
import NavBar from './components/common/NavBar'
import MenuBar from './components/common/MenuBar'
import DarkModeToggle from './components/common/DarkModeToggle'
import SidePanel from './components/common/SidePanel'
import Hero from './components/common/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="main">
      <NavBar />
      <div className='flex justify-center pt-4 dark:bg-darkmode-bg'>
        <aside className='w-1/6 ' >
          <SidePanel />
        </aside>
        <aside className='pl-4 w-4/6'>
          <Hero />
        </aside>
      </div>
    </div>
    </>
  )
}

export default App
