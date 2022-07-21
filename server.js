const express = require('express');


const app = express();


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const PORT = process.env.PORT || 3001;


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
