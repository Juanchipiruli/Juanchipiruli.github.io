import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../componentes/SearchBar';
import Header from '../componentes/Header';
import BuscarResultado from '../componentes/BuscarResultado';


export default function PaginaBusq(){
    const location = useLocation();
    const [statCargando, setCargando] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [terminoBusqueda, setTerminoBusqueda] = useState('');

    // Efecto para realizar búsqueda automática si hay un término de búsqueda en el estado
    useEffect(() => {
        if (location.state && location.state.busqueda) {
            onSearch(location.state.busqueda);
        }
    }, [location.state]);

    function onSearch(nombre)
    {
        setTerminoBusqueda(nombre);
        setCargando(true);
        axios.get(`https://api.mercadolibre.com/products/search?site_id=MLA&q=${nombre}`)
            .then((response) => {
                console.log('Respuesta completa:', response.data);
                const productos = response.data.results.map(item => {
                    // Extraer URLs de imágenes del array pictures
                    const imageUrls = item.pictures && item.pictures.length > 0 
                        ? item.pictures.map(pic => pic.url) 
                        : [];
                    
                    // Imagen principal (la primera o vacía si no hay)
                    const mainImage = imageUrls.length > 0 ? imageUrls[0] : '';
                    
                    return {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        img: mainImage,
                        allImages: imageUrls
                    };
                });
                setSearchResults(productos);
                setCargando(false);
            })
            .catch(error => {
                console.error("Error en la búsqueda:", error);
                setCargando(false);
            });
    }
    function inicio(){
        setSearchResults([]);
    }
    return(
    <>
        <Header title="Pagina de mierda"/>
        <button onClick={inicio}>
        Inicio
        </button>
        <SearchBar onSearch={onSearch} statCargando={statCargando}/>
        <BuscarResultado resultados={searchResults} busqueda={terminoBusqueda}/>
    </>
    )
}