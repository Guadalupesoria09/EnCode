const express = require('express');
const app = express();

const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

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

//const duenoRoutes = require('./routes/dueno.routes');
//app.use('/dueno', duenoRoutes);

const adminRoutes = require('./routes/sucursales.routes');
app.use('/admin', adminRoutes);

const duenoRoutes = require('./routes/promociones.routes');
app.use('/dueno', duenoRoutes);

const usuariosRoutes = require('./routes/usuarios.routes');
app.use('/', usuariosRoutes);

// const adminRoutes=require('./routes/admin.routes');
// app.use('/admin', adminRoutes);

// const duenoRoutes = require('./routes/dueno.routes');
// app.use('/dueno', duenoRoutes);


//app.use((request, response, next) => {
//    response.statusCode = 404;
//    response.render('404');
//})


// Ruta para la vista de estadísticas
app.get('/estadisticas', (req, res) => {
    const ventasTotales = 15000; // Total de ventas en MXN
    const productosPopulares = [
        { nombre: 'Producto A', cantidad: 30 },
        { nombre: 'Producto B', cantidad: 50 },
        { nombre: 'Producto C', cantidad: 20 }
    ];
    const ingresosPorMes = [
        { mes: 'Enero', ingresos: 3000 },
        { mes: 'Febrero', ingresos: 4000 },
        { mes: 'Marzo', ingresos: 3500 }
    ];

    // Renderiza la vista 'estadisticas' y pasa los datos a la plantilla
    res.render('estadisticas', {
        ventasTotales: ventasTotales,
        productosPopulares: JSON.stringify(productosPopulares),
        ingresosPorMes: JSON.stringify(ingresosPorMes)
    });
});

app.get('/estadisticasRewards', (req, res) => {
    res.render('estadisticasRewards', datosEjemplo);
});
    const datosEjemplo = {
        totalRecompensas: 3456, // Total de recompensas otorgadas
        recompensasPorTipo: JSON.stringify([
            { tipo: 'Descuento', cantidad: 45 },
            { tipo: 'Regalo', cantidad: 30 },
            { tipo: 'Puntos', cantidad: 25 }
        ]),
        recompensasPorMes: JSON.stringify([
            { mes: 'Enero', cantidad: 200 },
            { mes: 'Febrero', cantidad: 250 },
            { mes: 'Marzo', cantidad: 300 },
            { mes: 'Abril', cantidad: 400 },
            { mes: 'Mayo', cantidad: 350 }
         ])
};

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});