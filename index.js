const express = require('express');
const mongoose = require('mongoose');
const pozos = require('./Pozos.controller');
const app = express();
const port = 8000;

app.use(express.json());

mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://arcodev:admin1234@cluster0.lao8hvz.mongodb.net/pozos?retryWrites=true&w=majority');

app.get('/pozos', pozos.list);
app.post('/pozos', pozos.create);
app.get('/pozos/:id', pozos.get);

app.use(express.static('app'));

app.get('/', (req, res) => {
    console.log(__dirname);
    res.sendFile(`${__dirname}/index.html`)
});

app.get('*', (req, res) => {
    res.status(404).send('Acceso no autorizado');
});


app.listen(port, () => {
    console.log(`Inicializando la app en el puerto: ${port}`);
});