import { useState } from "react";

export default function SearchBar({onSearch, statCargando}){

const [buscarProducto, setBuscarProducto] = useState("");

    return (
        <>
        <form className="seachbar" onSubmit={(e) => {e.preventDefault(); onSearch(buscarProducto); setBuscarProducto("")}}>
            <input type="text" placeholder="Buscar Producto" 
            value={buscarProducto} onChange={(e) => setBuscarProducto(e.target.value)} />
            <button disabled={buscarProducto.length < 3}>Buscar</button>
        </form>
        {statCargando ? <p>Cargandooooooooooooooooooooooooooooooooooo...</p> : null}
        </>
    )
}