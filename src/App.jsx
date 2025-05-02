import './App.css'
import PaginaBusq from './pages/PaginaBusq'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginaDetail from './pages/PaginaDetail'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PaginaBusq/>}/>
          <Route path="/detail/:id" element={<PaginaDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
