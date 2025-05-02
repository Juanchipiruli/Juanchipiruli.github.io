import { useNavigate, useLocation } from 'react-router-dom';

export default function PaginaDetail(){
    const location = useLocation();
    const navigate = useNavigate();
    
    const volverAtras = () => {
        if (location.state && location.state.from) {
            navigate('/');
        } else {
            navigate('/');
        }
    };
    
    return (
        <div>
            <h1>Pagina Detail</h1>
            <button onClick={volverAtras}>Volver</button>
            
        </div>
    );
}