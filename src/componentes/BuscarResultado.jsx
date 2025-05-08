import { useState } from "react";
import ResultItem from "./ResultItem";
import { FaCartShopping } from "react-icons/fa6";
import { useCarrito } from "../context/CarritoContext";

export default function BuscarResultado({resultados, busqueda}){
    const { carro, agregarAlCarro } = useCarrito();
    
    return (
        <div>
            {!resultados || resultados.length === 0 ? (
                <h2>No se encontraron resultados</h2>
            ) : (
                <ul>
                    {resultados.map((resultado) => (
                        <li key={resultado.id}>
                        <ResultItem 
                            key={resultado.id} 
                            result={resultado} 
                            busqueda={busqueda}
                        />
                        <button 
                        onClick={() => agregarAlCarro(resultado)}
                        disabled={carro.some(item => item.id === resultado.id)}
                        >
                        <FaCartShopping />
                        </button>
                        </li>
                    ))}
                </ul> 
            )}
        </div>
    )   
}