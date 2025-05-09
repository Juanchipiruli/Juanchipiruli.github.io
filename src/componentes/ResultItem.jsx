import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useCarrito } from "../context/CarritoContext";
import "../styles/ResultItem.css"

export default function ResultItem({result, busqueda}){
    const { carro, agregarAlCarro } = useCarrito();
    return (
        <li key={result.id}>
            <section className="info">
                {result.img ? (
                    <img src={result.img} alt={result.name} />
                ) : (
                    <p>No hay imagen disponible   -</p>
                )}
                <Link 
                to={`/detail/${result.id}`}
                state={{ 
                    id: result.id,
                    name: result.name,
                    images: result.allImages || [],
                    price: result.price,
                    busq: busqueda // Pasar el término de búsqueda
                }}
                >
                <h3>{result.name}</h3>
               
            </Link> 
            </section>

            <section className="boton">
                <button 
                    onClick={() => agregarAlCarro(result)}
                    disabled={carro.some(item => item.id === result.id)}
                    >
                    <FaCartShopping />
                </button>
            </section>
        </li>
    )
}