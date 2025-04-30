import axios from 'axios';
import { useState } from 'react';
import SearchBar from '../componentes/SearchBar';
import Header from '../componentes/Header';
import BuscarResultado from '../componentes/BuscarResultado';


export default function PaginaBusq(){
    const [statCargando, setCargando] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    function onSearch(nombre)
    {
        setCargando(true);
        axios.get(`https://api.mercadolibre.com/products/search?site_id=MLA&q=${nombre}`)
            .then((response) => {
                const productos = response.data.results.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    img: item.pictures && item.pictures.length > 0 ? item.pictures[0].url : ''
                }));
                setSearchResults(productos);
                setCargando(false);
            })
            .catch(error => {
                console.error("Error en la búsqueda:", error);
                setCargando(false);
            });
    }
    return(
    <>
        <Header title="Pagina de mierda"/>
        <SearchBar onSearch={onSearch} statCargando={statCargando}/>
        <BuscarResultado resultados={searchResults}/>
    </>
    )
}