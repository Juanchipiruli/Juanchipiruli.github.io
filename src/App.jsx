import './App.css'
import PaginaBusq from './pages/PaginaBusq'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PaginaDetail from './pages/PaginaDetail'
import Carrito, { CarritoProvider } from './pages/Carrito'

function App() {
  return (
    <div className="app-container">
      <CarritoProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PaginaBusq/>}/>
            <Route path="/detail/:id" element={<PaginaDetail />} />
            <Route path='/carrito' element={<Carrito />}/>
          </Routes>
        </BrowserRouter>
      </CarritoProvider>
    </div>
  )
}

export default App
