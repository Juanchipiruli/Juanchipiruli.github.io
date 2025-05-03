import ResultItem from "./ResultItem";

export default function BuscarResultado({resultados, busqueda}){
    return (
        <div>
            {!resultados || resultados.length === 0 ? (
                <h2>No se encontraron resultados</h2>
            ) : (
                <ul>
                    {resultados.map((resultado) => (
                        <ResultItem 
                            key={resultado.id} 
                            result={resultado} 
                            busqueda={busqueda}
                        />
                    ))}
                </ul> 
            )}
        </div>
    )   
}