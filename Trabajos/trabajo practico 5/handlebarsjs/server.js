const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto http://localhost:${server.address().port}`);
});

app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/pages',
    partialsDir: __dirname + '/views/partials',
  })
);

let productsHC = [];

app.get('/', (req, res) => {
  res.render('pages/inicio');
});

app.get('/products', (req, res) => {
  res.render('productslist', { products: productsHC });
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
