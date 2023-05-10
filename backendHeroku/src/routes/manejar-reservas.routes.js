const { Router } = require("express");
const router = Router();

//* Controlador de home, tiene el comportamiento de PUT, GET, DELETE, POST *//
const manejoReservasController = require("../controllers/manejar-reservas.controller");
const token = require("../controllers/token");

router.post("/addReserva", token.verifyToken, manejoReservasController.registrarReserva);
router.get("/getByParqueoDia/:idParqueo/:dia", token.verifyToken, manejoReservasController.getByParqueoDia);
router.post("/getBetweenDates", token.verifyToken, manejoReservasController.getBetweenDates);
router.get("/getAllReservasActivas", token.verifyToken, manejoReservasController.getReservas);
router.delete("/deleteReservaActiva/:mongo_id", token.verifyToken, manejoReservasController.eliminarReserva);
router.get("/getByParqueo/:idParqueo", token.verifyToken, manejoReservasController.getByParqueo);
// router.get("/get-elegibles", token.verifyToken, manejoPlantillaController.getElegibles);
// router.post("/add/:cedula_funcionario", token.verifyToken, manejoPlantillaController.addOneFuncionario);
// router.post("/delete/:cedula_funcionario", token.verifyToken, manejoPlantillaController.deleteOneFuncionario);
// router.put("/addToPlanilla", token.verifyToken, manejoPlantillaController.addToPlanilla);
// router.put("/deleteFromPlanilla", token.verifyToken, manejoPlantillaController.deleteFromPlanilla);

module.exports = router;