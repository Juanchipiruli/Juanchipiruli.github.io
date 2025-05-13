import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCarrito } from './Carrito';

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
    const [atributos, setAtributos] = useState([]);

    useEffect(() => {
        obtenerDesc();
        axios.get(`/api/items/${id}`)
            .then(response => {
                setAtributos(response.data.attributes || []);
            });
    }, []);

    // En el return, agregar:
    {atributos.length > 0 && (
        <table className="tabla-atributos">
            <thead>
                <tr>
                    <th>Atributo</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                {atributos.map((attr, index) => (
                    <tr key={index}>
                        <td>{attr.name}</td>
                        <td>{attr.value_name || 'N/A'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )}
    const volverAtras = () => {
        navigate('/', {
            state: { busqueda: busq }
        });
    };
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };
    
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };
    
    return (
        <div className="detalle-container">
            <h1 className="detalle-titulo">Detalles del Producto</h1>
            <button 
                onClick={volverAtras}
                className="detalle-volver-btn"
            >
                Volver
            </button>
            
            <div>
                <h2>{name || 'Nombre no disponible'}</h2>
                <p>ID: {id}</p>
                <p>Precio: ${price || 'N/A'}</p>
                
                {!images || images.length === 0 ? (
                    <p>No hay imágenes disponibles</p>
                ) : (
                    <div className="carousel-container">
                        <div className="carousel" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                            {images.map((img, index) => (
                                <div key={index} className="carousel-slide">
                                    <img 
                                        src={img} 
                                        alt={`${name} - imagen ${index + 1}`}
                                        className="detalle-imagen"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="carousel-controls">
                            <button className="carousel-prev" onClick={prevImage}>‹</button>
                            <button className="carousel-next" onClick={nextImage}>›</button>
                        </div>
                        <div className="carousel-dots">
                            {images.map((_, index) => (
                                <span 
                                    key={index}
                                    className={`carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            ))}
                        </div>
                    </div>
                )}
                <p>{descripcion}</p>
                <button 
                    className="ml-button"
                    onClick={() => {
                        const { agregarAlCarro } = useCarrito();
                        agregarAlCarro({
                            id,
                            name,
                            price,
                            img: images?.[0] || ''
                        })
                    }}
                >
                    Comprar ahora
                </button>
            </div>
        </div>
    );
}
// Remove these lines from the end of the file:
// const { agregarAlCarro } = useCarrito();
// 
// // En el return, agregar:
// <button 
//     className="ml-button"
//     onClick={() => agregarAlCarro({
//         id,
//         name,
//         price,
//         img: images?.[0] || ''
//     })}
// >
//     Comprar ahora
// </button>