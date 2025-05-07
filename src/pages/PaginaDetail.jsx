import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function PaginaDetail(){
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [descripcion, setDescripcion] = useState("");
    
    // Extraer los datos del estado
    const { name, images, price, busq } = location.state || {};
    
    function obtenerDesc(){
        axios.get(`/api/items/${id}/description`)
            .then((response) => {
                console.log('Respuesta completa:', response.data);
                
            }).catch(error => {
                if (error.response) {
                    if (error.response.status === 404) {
                        setDescripcion("No existe descripción")
                    }
                }
            });
    }
    useEffect(() => {
        obtenerDesc();
    })

    
    const volverAtras = () => {
        navigate('/', {
            state: { busqueda: busq }
        });
    };
    
    return (
        <div>
            <h1>Detalles del Producto</h1>
            <button onClick={volverAtras}>Volver</button>
            
            <div>
                <h2>{name || 'Nombre no disponible'}</h2>
                <p>ID: {id}</p>
                <p>Precio: ${price || 'N/A'}</p>
                
                {/* Manejo simplificado de imágenes */}
                {!images || images.length === 0 ? (
                    <p>No hay imágenes disponibles</p>
                ) : images.length === 1 ? (
                    <div>
                        <img src={images[0]} alt={name} style={{maxWidth: '300px'}} />
                    </div>
                ) : (
                    <div>
                        <p>Imágenes disponibles ({images.length}):</p>
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                            {images.map((img, index) => (
                                <img 
                                    key={index} 
                                    src={img} 
                                    alt={`${name} - imagen ${index + 1}`} 
                                    style={{maxWidth: '200px'}} 
                                />
                            ))}
                        </div>
                    </div>
                )
                }
                <p>
                    {descripcion}
                </p>
            </div>
            
        </div>
    );
}