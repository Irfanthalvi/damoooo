import React from 'react'
import Form from "./Components/Form";
import Formget from './Components/Formget';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/Formget' element={<Formget />} />
        </Routes>
      </BrowserRouter>


    </div>
  )
}

export default App