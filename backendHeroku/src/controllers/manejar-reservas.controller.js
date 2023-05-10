const { ReservaActiva, ReservaHistorial } = require("../models/Reserva");
const mongodb = require("mongodb");
const reservasController = {};

reservasController.registrarReserva = async (req, res) => {
    const newReservaActiva = new ReservaActiva(req.body);
    await newReservaActiva.save();

    const newReservaHistorial = new ReservaHistorial(req.body);
    await newReservaHistorial.save();

    res.send("Registered")
};

reservasController.getByParqueo = async (req, res) => {
    const foundReservasActivas = await ReservaActiva.find(
            { id_parqueo: req.body.idParqueo})
    res.send(foundReservasActivas)
};

reservasController.getByParqueoDia = async (req, res) => {
    const foundReservaActiva = await ReservaActiva.find({idParqueo: req.params.idParqueo, 'rangoHorario.dia' : req.params.dia})
    
    res.send(foundReservaActiva)
};

reservasController.getBetweenDates = async (req, res) => {
    console.log("req.body", req.body);

    const foundReservas = await ReservaHistorial.find({
        $and: [
            {idPersona: req.body.idPersona},
            {"rangoHorario.dia_mes": { $gte: req.body.dI , $lte: req.body.dF }},
            {"rangoHorario.mes": { $gte: req.body.mI , $lte: req.body.mF }},
            {"rangoHorario.anio": { $gte: req.body.aI , $lte: req.body.aF }}
        ]
    })

    console.log("foundReservas", foundReservas);
    const reservas = await sortDates(foundReservas);
    console.log("reservas", reservas);

    res.send(reservas);
}
reservasController.getReservas = async (req, res) => {
    const foundReservaActiva = await ReservaActiva.find()
    
    res.send(foundReservaActiva)
};


reservasController.eliminarReserva = async (req, res) => {
    console.log(req.params.mongo_id)
    await ReservaActiva.deleteOne({ _id: new mongodb.ObjectId(req.params.mongo_id) });
    res.send("Deleted");
}

async function sortDates(array) {
    return array.sort(function(a,b){
        //return new Date(a.rangoHorario.dia_mes + "-" + a.rangoHorario.mes + "-" + a.rangoHorario.anio) - new Date(b.rangoHorario.dia_mes + "-" + b.rangoHorario.mes + "-" + b.rangoHorario.anio);
        return new Date(b.rangoHorario.anio, b.rangoHorario.mes, b.rangoHorario.dia_mes) - new Date(a.rangoHorario.anio, a.rangoHorario.mes, a.rangoHorario.dia_mes);
      });
}

module.exports = reservasController;