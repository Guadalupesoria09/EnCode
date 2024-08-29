const express = require('express');
const app = express();

const path = require('path');

//app.use(express.static(path.join(__dirname, 'public')));

app.use('/CSS', express.static(path.resolve(__dirname, "public/CSS")));
app.use('/logoDuper', express.static(path.resolve(__dirname, "public/logoDuper")));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('views', 'views');

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

const session = require('express-session');
app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

//Middleware
app.use((request, response, next) => {
    console.log('Middleware!');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});
app.use(express.static(path.join(__dirname, 'public')));

const duenoRoutes = require('./routes/dueno.routes');
app.use('/dueno', duenoRoutes);

const usuariosRoutes = require('./routes/usuarios.routes');
app.use('/', usuariosRoutes);

// const adminRoutes=require('./routes/admin.routes');
// app.use('/admin', adminRoutes);

// const duenoRoutes = require('./routes/dueno.routes');
// app.use('/dueno', duenoRoutes);


app.use((request, response, next) => {
    response.statusCode = 404;
    response.render('404');
})

app.listen(3000);