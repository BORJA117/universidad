const express = require('express');
const app = express();
const path = require('path');

// Configurar el puerto
const port = process.env.PORT || 3000; // Puedes cambiar el puerto si es necesario

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de ejemplo para renderizar el archivo index.ejs
app.use('/', require('./routes/home'));
app.use('/index', require('./routes/home'));


// Otras rutas
app.get('/avisos', (req, res) => {
  res.render('avisos', { title: 'Noticias' });
});


app.get('/cursos', (req, res) => {
  res.render('cursos', { title: 'Cursos' });
});

app.get('/contacto', (req, res) => {
  res.render('contacto', { title: 'Contacto' });
});


// Manejar errores 404
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Página no encontrada' });
});

// Manejar errores 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: 'Error interno del servidor' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
