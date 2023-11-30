const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

const app = express();

app.use(cors());
app.use(express.json());
dbConnection();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use('/api/auth', require("./routes/auth"));
app.use('/api/phone', require("./routes/phone"));
app.use('/api/address', require("./routes/address"));
app.use('/api/city', require("./routes/city"));
app.use('/api/state', require("./routes/state"));
app.use('/api/country', require("./routes/country"));
app.use('/api/product', require("./routes/product"));
app.use('/api/service', require("./routes/service"));
app.use('/api/quotation', require("./routes/quotation"));

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Conectado al puerto: http://localhost:${port}`);
});