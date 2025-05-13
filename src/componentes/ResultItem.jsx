import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useCarrito } from "../pages/Carrito";
import "../styles/ResultItem.css"

export default function ResultItem({result, busqueda}){
    const { carro, agregarAlCarro } = useCarrito();
    return (
        <div className="product-card">
            <div className="info">
                {result.img && (
                    <img 
                        src={result.img} 
                        alt={result.name} 
                        className="product-image"
                    />
                )}
                <Link 
                to={`/detail/${result.id}`}
                state={{ 
                    id: result.id,
                    name: result.name,
                    images: result.allImages || [],
                    price: result.price,
                    busq: busqueda
                }}
                >
                <h3 className="product-title">{result.name}</h3>
            </Link>
        </div>
        <button 
            className="ml-button"
            onClick={() => agregarAlCarro(result)}
            disabled={carro.some(item => item.id === result.id)}
        >
            <FaCartShopping /> Agregar al carrito
        </button>
    </div>
    )
}