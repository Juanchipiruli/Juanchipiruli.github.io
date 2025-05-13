import { useCarrito } from '../pages/Carrito'
import { FaCartShopping } from 'react-icons/fa6';

export default function Header({ inicioA }) {
    const { carro } = useCarrito();
    return (
        <div className="header-container">
            <button className="carrito-compras" onClick={inicioA}>
                <img 
                    src="https://logodownload.org/wp-content/uploads/2018/10/mercado-libre-logo.png" 
                    alt="MercadoLibre" 
                />
            </button>
            <div className="header-cart">
                <FaCartShopping />
                {carro.length > 0 && (
                    <span className="cart-count">{carro.length}</span>
                )}
            </div>
        </div>
    );
}

