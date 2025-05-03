import { Link } from "react-router-dom";

export default function ResultItem({result, busqueda}){
    return (
        <li key={result.id}>
            {result.img ? (
                <img src={result.img} alt={result.name} />
            ) : (
                <p>No hay imagen disponible</p>
            )}
            <h3>{result.name}</h3>
            <p>${result.price}</p>
            <Link 
                to={`/detail/${result.id}`}
                state={{ 
                    name: result.name,
                    images: result.allImages || [],
                    price: result.price,
                    busq: busqueda // Pasar el término de búsqueda
                }}
            >
                <button>Detalle</button>
            </Link>
        </li>
    )
}