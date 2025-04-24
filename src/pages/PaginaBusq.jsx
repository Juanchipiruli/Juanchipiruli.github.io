import axios from 'axios';
import { useState } from 'react';


export default function PaginaBusq(){
    const [statCargando, setCargando] = useState(false);
    const [searchResults, setSearchResults] = useState(undefined);

    function onSearch(nombre){
        setCargando(true);
        axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${nombre}`)
        .then(
            function(response){
                setCargando(false);
                if(response.data.results.length === 1){
                    setSearchResults([response.data.results]); //si hay un solo resultado no se comporta como array
                }else{
                    setSearchResults(response.data.results);
                }
            }
        
        )
    }
}