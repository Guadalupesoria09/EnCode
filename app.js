const express = require('express');
const app = express();
const mysql = require('mysql2');

const favicon = require('serve-favicon');

require('dotenv').config();

console.log('TWILIO_ACCOUNT_SID:', process.env.TWILIO_ACCOUNT_SID);
console.log('TWILIO_AUTH_TOKEN:', process.env.TWILIO_AUTH_TOKEN);

const path = require('path');
const port = 3001;

app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/CSS', express.static(path.resolve(__dirname, "public/CSS")));
app.use('/logoDuper', express.static(path.resolve(__dirname, "public/logoDuper")));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('views', 'views');

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const session = require('express-session');
app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: true, 
}));

const multer = require('multer');
//fileStorage: Es nuestra constante de configuración para manejar el almacenamiento
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        //'uploads': Es el directorio del servidor donde se subirán los archivos 
        callback(null, 'public/uploads');
    },
    filename: (request, file, callback) => {
        //aquí configuramos el nombre que queremos que tenga el archivo en el servidor, 
        //para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
        callback(null, new Date().getTime() + file.originalname);
    },
});

app.use(multer({ storage: fileStorage }).single('background')); 

const csrf = require('csurf');
const csrfProtection = csrf();
app.use(csrfProtection); 

app.use((request, response, next) => {
    response.locals.telefono = request.session.telefono || '';
    next();
});

app.use((request, response, next) => {
    response.locals.username = request.user ? request.user.username : ''; // Para tener username disponible en todas las vistas
    next();
});


app.use(express.static(path.join(__dirname, 'public')));



const tarjetaRoutes = require('./routes/tarjeta.routes');
app.use('/tarjeta', tarjetaRoutes);

const configuracionRoutes = require('./routes/configuracion.routes');
app.use('/config', configuracionRoutes);

const estadisticasRoutes = require('./routes/estadisticas.routes');
app.use('/estadisticas', estadisticasRoutes);

const sucursalesRoutes = require('./routes/sucursales.routes');
app.use('/sucur', sucursalesRoutes);

const recompensasRoutes = require('./routes/recompensas.routes');
app.use('/recomp', recompensasRoutes);

const promocionesRoutes = require('./routes/promociones.routes');
app.use('/promo', promocionesRoutes);

const usuariosRoutes = require('./routes/usuarios.routes');
app.use('/',usuariosRoutes);

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
