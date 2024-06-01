/* -------------------------- Importar dependencias ------------------------- */
import express from 'express';
import morgan from 'morgan';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';
import {engine} from 'express-handlebars';
import Handlebars from 'handlebars';
import personasRoutes from './routes/personas.routes.js'

/* --------------------------------- Helpers -------------------------------- */
Handlebars.registerHelper('eq', function(a, b) {
    return a === b;
});

Handlebars.registerHelper('calculateTotal', function(cantidad, precio) {
    return cantidad * precio;
});

/* ----------------------------- Initialization ----------------------------- */
const app = express();
/*Evitar colisiones de nombres de variable*/
const __dirname = dirname(fileURLToPath(import.meta.url));

/* --------------------------------- Setting -------------------------------- */
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


/* ------------------------------- Middlewares ------------------------------ */
app.use(morgan('dev'));
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

/* --------------------------------- Routes --------------------------------- */
app.get('/', (req, res) => {
    res.render('index')
});

app.use(personasRoutes);

/* ------------------------------ Public files ------------------------------ */
app.use(express.static(join(__dirname, 'public')));

/* ------------------------------- Run server ------------------------------- */
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});
