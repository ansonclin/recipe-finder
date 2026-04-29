require('dotenv').config()
const express = require('express');
const app = express();

app.get('/api/hello', (req,res) => {
    res.json( {message:'Hello from the backend!'});
});


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});