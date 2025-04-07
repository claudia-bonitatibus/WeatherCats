import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

app.use(cors());

app.get('/v1/search',async(req, res) =>{
    res.contentType = 'application/json';
    const params = new URLSearchParams(req.query);
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const jsonResponse = await response.json();
    res.status(response.status).json(jsonResponse);  
})

app.get('/v1/forecast',async(req, res) =>{
    res.contentType = 'application/json';
    const params = new URLSearchParams(req.query);
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const jsonResponse = await response.json();
    res.status(response.status).json(jsonResponse);  
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


