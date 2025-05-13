

export default function Header({ inicioA }) {
    return (
        <div className="header-container">
            <button style={
                {
                    textDecoration: 'none',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                }
            } onClick={inicioA}>
            
                <img 
                    src="https://logodownload.org/wp-content/uploads/2018/10/mercado-libre-logo.png" 
                    alt="MercadoLibre" 
                    style={{ width: '100px', height: 'auto' }}
                />
                
            </button>
            
        </div>
    );
}

