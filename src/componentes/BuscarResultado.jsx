import {Link} from "react-router-dom";
import ResultItem from "./ResultItem";

export default function BuscarResultado({resultados}){

    return (
        <div>
            {resultados? resultados.length === 0?(
            <h2>No se encontraron resultados</h2>
        ):(
            <ul>
                {resultados.map(
                    (resultados) => (
                        <ResultItem result={resultados.name}/>
                    )
                )}
            </ul> 
        ): null}

        </div>
    )   
        
}