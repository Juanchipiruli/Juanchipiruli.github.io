import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3001;

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Ruta principal para proxying de solicitudes a la API de Mercado Libre
app.use('/api', async (req, res) => {
  try {
    // Construir la URL de destino
    const targetUrl = `https://api.mercadolibre.com${req.url}`;
    console.log(`Proxy: Redirigiendo solicitud a ${targetUrl}`);

    // Obtener método HTTP y headers
    const method = req.method;
    const headers = {
      ...req.headers,
      host: 'api.mercadolibre.com'
    };
    
    // Eliminar headers que pueden causar problemas
    delete headers.host;
    delete headers.origin;
    delete headers.referer;

    // Realizar la solicitud a la API de Mercado Libre
    const response = await axios({
      method,
      url: targetUrl,
      headers,
      data: method !== 'GET' ? req.body : undefined,
      validateStatus: () => true // Permitir cualquier código de estado
    });

    // Devolver la respuesta al cliente
    res.status(response.status);
    Object.entries(response.headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    res.send(response.data);
  } catch (error) {
    console.error('Error en el proxy:', error.message);
    res.status(500).json({ error: 'Error en el servidor proxy' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor proxy CORS ejecutándose en http://localhost:${PORT}`);
});