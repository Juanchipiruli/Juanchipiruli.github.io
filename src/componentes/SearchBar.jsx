import { useState } from "react";

export default function SearchBar(){

const [buscarProducto, setBuscarProducto] = useState("");

    return (
        <form className="seachbar" onSubmit={(e) => {e.preventDefault(); onSearch(buscarProducto);}}>
            <input type="text" placeholder="Buscar Producto" 
            value={buscarProducto} onChange={(e) => setBuscarProducto(e.target.value)} />
            <button disabled={buscarProducto.length < 3}>Buscar</button>
        </form>
    )
}