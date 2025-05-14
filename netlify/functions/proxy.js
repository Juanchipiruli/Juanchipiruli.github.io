const axios = require('axios');

exports.handler = async (event) => {
  try {
    // Primero obtener un token de autenticación
    const tokenResponse = await axios.post('https://api.mercadolibre.com/oauth/token',
      {
        grant_type: "client_credentials",
        client_id: "3334559570587266",
        client_secret: "DufQ2GrPj5abeVfdt7MIQ9COw50LfSpL"
      },
      {
        headers: {
          "accept": "application/json",
          "content-type": "application/x-www-form-urlencoded"
        }
      }
    );
    
    const accessToken = tokenResponse.data.access_token;
    
    // Extraer la ruta y parámetros de consulta
    const path = event.path.replace('/.netlify/functions/proxy', '');
    const queryString = new URLSearchParams(event.queryStringParameters || {}).toString();
    const url = `https://api.mercadolibre.com${path}?${queryString}`;
    
    console.log(`Proxy: Redirigiendo solicitud a ${url}`);
    
    // Realizar la solicitud a la API de Mercado Libre con el token
    const response = await axios({
      method: event.httpMethod || 'GET',
      url: url,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    // Devolver la respuesta al cliente
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
    
    // Devolver información detallada del error para depuración
    return {
      statusCode: error.response?.status || 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'Error al consultar la API',
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      })
    };
  }
};