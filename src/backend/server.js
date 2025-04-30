require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

// Configuración
const PORT = process.env.PORT || 3000;
let accessToken = '';

// Renueva el token cada 5 horas
const refreshToken = async () => {
  try {
    const response = await axios.post('https://api.mercadolibre.com/oauth/token', new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    accessToken = response.data.access_token;
    console.log('✅ Token renovado:', accessToken.slice(0, 15) + '...');
  } catch (error) {
    console.error('❌ Error renovando token:', error.message);
  }
};

// Endpoint para buscar productos
app.get('/api/search', async (req, res) => {
  const { q } = req.query; // Ej: /api/search?q=licuadoras
  try {
    const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${q}`, {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inicia el servidor y renueva el token
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  refreshToken();
  setInterval(refreshToken, 5 * 60 * 60 * 1000); // 5 horas
});