import { useState } from "react";
import ResultItem from "./ResultItem";

import "../styles/BuscarResultado.css";

export default function BuscarResultado({resultados, busqueda}){
    
    
    return (
        <div className="contenedoraso">
            {!resultados || resultados.length === 0 ? (
                <h2>No se encontraron resultados</h2>
            ) : (
                <ul className="citem">
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