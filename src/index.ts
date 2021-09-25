import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.json({"message": 'Server is Alive'});
})

app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`)
})