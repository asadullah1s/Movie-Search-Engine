import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Single from './Components/Single'
import Fav from './Components/Fav'

import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  const [count, setCount] = useState(0)
  const url ="http://www.omdbapi.com/?apikey=28a8e30b&"
  return (
    <>
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/single/:id" element={<Single />} />
        <Route path='/Fav' element={<Fav />}></Route>
        
      </Routes>
    </Router>
      
      
      

    </>
  )
}

export default App
