import { useState } from "react";
import "../styles/SearchBar.css"
import { IoMdSearch } from "react-icons/io";

export default function SearchBar({onSearch, statCargando}){

const [buscarProducto, setBuscarProducto] = useState("");

    return (
        <>
        <form className="searchbar" onSubmit={(e) => {e.preventDefault(); onSearch(buscarProducto); setBuscarProducto("")}}>
            <input type="text" placeholder="Buscar Producto" 
            value={buscarProducto} onChange={(e) => setBuscarProducto(e.target.value)} />
            <button disabled={buscarProducto.length < 3}>
            <IoMdSearch id="lupa"/>
            </button>
        </form>
        {statCargando ? <div className="loader-container">
                <div className="loader"></div>
            </div> : null}
        </>
    )
}