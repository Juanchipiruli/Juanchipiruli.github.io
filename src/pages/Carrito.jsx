import { useNavigate, useLocation } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { FaTrash } from 'react-icons/fa';

export default function Carrito(){
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
        <>
        <h1>Mi Carrito de Compras</h1>
        <button onClick={volverAtras}>Volver a inicio</button>
        
        {carro.length === 0 ? (
            <p>No hay productos en el carrito</p>
        ) : (
            <ul>
                {carro.map(producto => (
                    <li key={producto.id} style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                        {producto.img && <img src={producto.img} alt={producto.name} style={{maxWidth: '100px', marginRight: '10px'}} />}
                        <div>
                            <h3>{producto.name}</h3>
                            <p>${producto.price}</p>
                        </div>
                        <button 
                            onClick={() => eliminarProducto(producto.id)}
                        >
                            <FaTrash />
                        </button>
                    </li>
                ))}
            </ul>
        )}
        </>
    )
};