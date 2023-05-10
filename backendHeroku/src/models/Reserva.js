const { Schema, model } = require("mongoose");
const reserva_schema = new Schema(
  {
    idReserva: String,
    idPersona: String,
    idEspacio: String,
    idParqueo: String,
    placa: String,
    rangoHorario: {
      dia: String,
      dia_mes: Number,
      mes: Number,
      anio: Number,
      hora_entrada: String,
      hora_salida: String,
    },
    nombreVisitante: String,
    nombreJefaturaAdmin: String,
    motivo: String,
    sitio: String,
    modelo: String,
    color: String
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ReservaActiva = model("reservasActivas", reserva_schema);
const ReservaHistorial = model("reservasHistorial", reserva_schema);
module.exports = {ReservaActiva, ReservaHistorial};
