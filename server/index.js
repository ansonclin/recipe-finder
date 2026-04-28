require('dotenv').config()
const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send('Hello from the backend!');
});


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});