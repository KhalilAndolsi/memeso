import React from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import Meme from './components/meme/Meme'

const App = () => {
  return (
    <>
      <BrowserRouter basename='/'>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/meme/:meme" element={<Meme/>} />
            <Route path="/meme/:meme/*" element={<h1 className="h-[80vh] grid place-items-center font-bold text-3xl uppercase text-blue-600">Page Not Found | Error 404</h1>} />
            <Route path="/*" element={<h1 className="h-[80vh] grid place-items-center font-bold text-3xl uppercase text-blue-600">Page Not Found | Error 404</h1>} />
          </Routes>
          <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App