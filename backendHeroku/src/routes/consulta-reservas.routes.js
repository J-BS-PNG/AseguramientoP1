//* Enrutador de la página principal *//

const { Router } = require("express");
const router = Router();

//* Controlador de home, tiene el comportamiento de PUT, GET, DELETE, POST *//
const consultaParqueosController = require("../controllers/consulta-parqueos.controller");
const token = require("../controllers/token");



module.exports = router;