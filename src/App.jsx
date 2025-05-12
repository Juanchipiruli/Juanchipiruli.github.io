import './App.css'
import PaginaBusq from './pages/PaginaBusq'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginaDetail from './pages/PaginaDetail'
import Carrito from './pages/Carrito'
import { CarritoProvider } from './context/CarritoContext';
function App() {
  return (
    <>
    <CarritoProvider>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<PaginaBusq/>}/>
          <Route path="/detail/:id" element={<PaginaDetail />} />
          <Route path='/carrito' element={<Carrito />}></Route>
        </Routes>
      </BrowserRouter>
    </CarritoProvider>
      
    </>
  )
}

export default App
