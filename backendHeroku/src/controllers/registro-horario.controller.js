// * Controlador de '/home' *//


const registrarHorarioController = {};

const Funcionario = require("../models/Usuario_Funcionario");

registrarHorarioController.asociarHorario = async (req, res) => {
    const funcionarioEncontrado = await Funcionario.findOne({
      identificacion: req.params.cedula_funcionario,
    });
    const horariosFuncionario = funcionarioEncontrado;
  
    var exists = 0;
  
    /*for (let index = 0; index < horariosFuncionario.horario.length; index++) {
      //console.log(horariosFuncionario.placas_asociadas[index].codigo_placa);  
      if (horariosFuncionario.horario[index].codigo_placa==req.body.codigo_placa) {
          exists = 1
          console.log("Exists")
      }
    }*/
  
    horariosFuncionario.horario.push(req.body);
  
  
    //console.log(horariosFuncionario);
   // if (!exists) {
      await funcionarioEncontrado.save();
      
  //  }
    res.send("Horario añadido");
    
  };

  registrarHorarioController.getHorarios = async (req, res) => {
    const funcionarioEncontrado = await Funcionario.findOne({
      identificacion: req.id,
    });
    console.log(req.id);    
    const horariosFuncionario = funcionarioEncontrado;
  
    res.send(horariosFuncionario.horario);
    
  };

  registrarHorarioController.updateHorarios = async (req, res) => {
    console.log("in api");
    const funcionarioEncontrado = await Funcionario.findOne({identificacion: req.id})
    funcionarioEncontrado.horario = req.body;
    funcionarioEncontrado.overwrite(funcionarioEncontrado);
    await funcionarioEncontrado.save();
    res.send("Updated");
};

module.exports = registrarHorarioController;
