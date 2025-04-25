import axios from 'axios';
import { useState } from 'react';
import SearchBar from '../componentes/SearchBar';
import Header from '../componentes/Header';
import BuscarResultado from '../componentes/BuscarResultado';


export default function PaginaBusq(){
    const [statCargando, setCargando] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    function onSearch(nombre){
        setCargando(true);
        setCargando(false);
        setSearchResults([...searchResults, {nombre}]);
        ;
        
    }
    return(
    <>
        <Header title="Pagina de mierda"/>
        <SearchBar onSearch={onSearch} statCargando={statCargando}/>
        <BuscarResultado resultados={searchResults}/>
    </>
    )
}