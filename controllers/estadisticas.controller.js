// estadisticas.controllers.js

// Datos de ejemplo para las estadísticas
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

// Controlador para /estadisticas
exports.getEstadisticas = (req, res) => {
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
};

// Controlador para /estadisticasRewards
exports.getEstadisticasRewards = (req, res) => {
    res.render('estadisticasRewards', datosEjemplo);
};
