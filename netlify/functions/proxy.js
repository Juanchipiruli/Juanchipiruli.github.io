import axios from 'axios';

export const handler = async (event) => {
  try {
    // Extraer la ruta y parámetros de consulta
    const path = event.path.replace('/.netlify/functions/proxy', '');
    const queryString = new URLSearchParams(event.queryStringParameters).toString();
    const url = `https://api.mercadolibre.com${path}?${queryString}`;
    
    console.log(`Proxy: Redirigiendo solicitud a ${url}`);
    
    // Realizar la solicitud a la API de Mercado Libre
    const response = await axios.get(url);
    
    // Devolver la respuesta
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Error en el proxy:', error.message);
    return {
      statusCode: error.response?.status || 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'Error al consultar la API',
        message: error.message,
        status: error.response?.status
      })
    };
  }
};