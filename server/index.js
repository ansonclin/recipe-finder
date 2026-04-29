require('dotenv').config()
const axios = require('axios');
const express = require('express');
const app = express();

app.get('/api/hello', (req,res) => {
    res.json( {message:'Hello from the backend!'});
});

app.get('/api/search', async (req, res) => {
  const ingredients = req.query.ingredients;
  const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      key: process.env.YOUTUBE_API_KEY,
      q: `${ingredients} recipe`,
      part: 'snippet',
      type: 'video',
      maxResults: 5
    }
  });
  res.json(response.data.items);
});


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});