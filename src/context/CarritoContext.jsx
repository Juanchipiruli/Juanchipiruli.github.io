import { createContext, useState, useContext } from 'react';

// se crea el contexto
const CarritoContext = createContext();

// hook personalizado para usar el contexto
export const useCarrito = () => useContext(CarritoContext);

// este componente les da el contexto
export const CarritoProvider = ({ children }) => {
  const [carro, setCarro] = useState([]);

  // se agrega un item al carrito
  const agregarAlCarro = (producto) => {
    if (!carro.some(item => item.id === producto.id)) {
      setCarro([...carro, producto]);
    }
  };

  // estos son los valores que se muestran por el contexto
  const value = {
    carro,
    setCarro,
    agregarAlCarro
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};