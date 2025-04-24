import './App.css'
import PaginaBusq from './pages/PaginaBusq'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PaginaBusq/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
