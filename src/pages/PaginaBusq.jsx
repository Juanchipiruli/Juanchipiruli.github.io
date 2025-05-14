import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../componentes/SearchBar';
import Header from '../componentes/Header';
import BuscarResultado from '../componentes/BuscarResultado';
import '../styles/PaginaBusq.css';
import { FaHome } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";


export default function PaginaBusq(){
    const location = useLocation();
    const [statCargando, setCargando] = useState(false);
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    
    useEffect(() => {
        requestToken();
    }, []);
    // Efecto para realizar búsqueda automática si hay un término de búsqueda en el estado
    useEffect(() => {
        if (location.state && location.state.busqueda) {
            onSearch(location.state.busqueda);
        }
    }, [location.state]);

    function requestToken(){
        axios.post('https://api.mercadolibre.com/oauth/token',
        {
            grant_type:"client_credentials",
            client_id: "3334559570587266",
            client_secret: "DufQ2GrPj5abeVfdt7MIQ9COw50LfSpL"
        },
        {
            headers: {
                "accept": "application/json",
                "content-type": "application/x-www-form-urlencoded"
            }
        }
        ).then(
            (data) => {
                console.log(data);
                axios.defaults.headers.common['Authorization'] = "Bearer " + data.data.access_token;
            }
        ).catch(error => {
            console.error("Error obteniendo token:", error);
        })
    }

    function onSearch(nombre) {
        setTerminoBusqueda(nombre);
        setCargando(true);
        const baseUrl = import.meta.env.DEV 
        ? '/api' 
        : '/.netlify/functions/proxy';
        const url = import.meta.env.DEV
        ? `${baseUrl}/products/search?site_id=MLA&q=${nombre}`
        : `${baseUrl}/products/search?site_id=MLA&q=${nombre}`;
        axios.get(`${url}`)
            .then((response) => {
                console.log('Respuesta completa:', response.data);
                const productos = response.data.results.map(item => {
                    // Extraer categorías
                    const categories = item.categories || [];
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
                        allImages: imageUrls,
                        category: categories.length > 0 ? categories[0].name : 'Sin categoría'
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
        console.log('inicio');
    }
    function irCarro(){
        navigate('/carrito', {
            state: { busqueda: terminoBusqueda }
        });
    }
    const [filter, setFilter] = useState('');
    const filteredResults = filter 
        ? searchResults.filter(item => item.category.includes(filter))
        : searchResults;

    return(
        <div className='container'>
            <div className="cabeza">
                <section className="botones">
                    <button onClick={inicio} className="botonessup">
                        <FaHome />
                    </button>
                    <button onClick={irCarro} className="botonessup">
                        <FaCartShopping />
                    </button>
                </section>
                <Header inicioA={inicio}/>
                <SearchBar onSearch={onSearch} statCargando={statCargando}/>
                
            </div>
            
            <div className='main-container'>
                <div className="filtro-categorias">
                    <select onChange={(e) => setFilter(e.target.value)}>
                        <option value="">Todas las categorías</option>
                        {[...new Set(searchResults.map(item => item.category))].map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <BuscarResultado resultados={filteredResults} busqueda={terminoBusqueda}/>
            </div>
        </div>
    );
}
