import { Link , useLocation } from "react-router-dom";

export default function ResultItem({result}){
    return (
        <li key={result.id}>
            {result.img=== ""? null : <img src={result.img} alt={result.name} />}
            <h3>{result.name}</h3>
            <p>${result.price}</p>
            <Link to={`/detail/${result.id}`}>
                <button>Detalle</button>
            </Link>
        </li>
    )
}