import { createContext, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import '../App.css';

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const [carro, setCarro] = useState([]);

    const agregarAlCarro = (producto) => {
        setCarro([...carro, producto]);
    };

    const eliminarDelCarro = (id) => {
        setCarro(carro.filter(item => item.id !== id));
    };

    return (
        <CarritoContext.Provider value={{ carro, agregarAlCarro, eliminarDelCarro, setCarro }}>
            {children}
        </CarritoContext.Provider>
    );
}

export function useCarrito() {
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error('useCarrito must be used within a CarritoProvider');
    }
    return context;
}

// Default export remains your Carrito component
export default function Carrito() {
    const navigate = useNavigate();
    const location = useLocation();
    const { carro, setCarro } = useCarrito();
    
    // Obtener el término de búsqueda del estado de navegación si existe
    const busq = location.state?.busqueda || '';
    
    const volverAtras = () => {
        // Solo pasamos el término de búsqueda si realmente existe uno
        if (busq) {
            navigate('/', {
                state: {busqueda: busq}
            });
        } else {
            // Si no hay término de búsqueda, navegamos sin estado
            navigate('/');
        }
    };
    
    // Función para eliminar un producto del carrito
    const eliminarProducto = (id) => {
        setCarro(carro.filter(producto => producto.id !== id));
    };
    
    return(
        <div className="carrito-container">
            <h1 className="carrito-titulo">Mi Carrito de Compras</h1>
            <button 
                onClick={volverAtras}
                className="ml-button"
            >
                Volver a inicio
            </button>
            
            {carro.length === 0 ? (
                <p className="carrito-vacio">No hay productos en el carrito</p>
            ) : (
                <ul className="carrito-lista">
                    {carro.map(producto => (
                        <li key={producto.id} className="carrito-item">
                            {producto.img && <img 
                                src={producto.img} 
                                alt={producto.name} 
                                className="carrito-imagen"
                            />}
                            <div className="carrito-info">
                                <h3 className="carrito-nombre">{producto.name}</h3>
                            </div>
                            <button 
                                onClick={() => eliminarProducto(producto.id)}
                                className="carrito-eliminar-btn"
                            >
                                <FaTrash />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
};