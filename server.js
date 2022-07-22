const path = require('path');
const express = require('express');
require('dotenv').config()


const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


const app = express();


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}! http://localhost:${PORT}/`);
});

