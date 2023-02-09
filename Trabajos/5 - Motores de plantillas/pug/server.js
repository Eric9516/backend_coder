const express = require('express');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto http://localhost:${server.address().port}`);
});

app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'pug');
app.set('views', './views');

let productsHC = [];

app.get('/', (req, res) => {
  res.render('pages/inicio');
});

app.get('/products', (req, res) => {
  res.render('pages/products', { products: productsHC });
});

app.post('/products', (req, res) => {
  const { body } = req;
  body.id = productsHC.length + 1;
  productsHC.push(body);
  res.render('pages/form');
});

app.get('/form', (req, res) => {
  res.render('pages/form');
});
