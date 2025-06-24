const { param } = require("../routers/RouterSucursales");
const sucursalService = require("../services/sucursalService");

exports.readSucursales = async (req, res) => {
  try {
    const ordenar = req.query.ordenar || "ASC";
    const sucursales = await sucursalService.getTodasSucursales(ordenar);
    res.json(sucursales);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener sucursales", error: error.message });
  }
};

exports.readSucursalSola = async (req, res) => {
  try {
    const nombreSucursal = req.params.sucursal; // parámetro en ruta
    const sucursal = await sucursalService.getSucursalSolaPorNombre(
      nombreSucursal
    );
    if (!sucursal)
      return res.status(404).json({ message: "Sucursal no encontrada" });

    res.json(sucursal);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener sucursal", error: error.message });
  }
};

exports.readSucursalCompleta = async (req, res) => {
  try {
    const nombreSucursal = req.params.sucursal; // parámetro en ruta
    const sucursal = await sucursalService.getSucursalCompletaPorNombre(
      nombreSucursal
    );
    if (!sucursal)
      return res.status(404).json({ message: "Sucursal no encontrada" });

    res.json(sucursal);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener sucursal", error: error.message });
  }
};

exports.createSucursal = async (req, res) => {
  try {
    const sucursalNueva = req.body;
    const resultado = await sucursalService.createNewSucursal(sucursalNueva);
    res.status(201).json(resultado);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear sucursal", error: error.message });
  }
};

exports.updateSucursal = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { NOMBRE } = req.body;

    const resultado = await sucursalService.updateSucursal(id, NOMBRE);
    if (!resultado)
      return res.status(404).json({ message: "Sucursal no encontrada" });

    res.json({ message: "Sucursal actualizada correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar sucursal", error: error.message });
  }
};

exports.deleteSucursal = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).send("ID inválido");
    }

    await sucursalService.deleteSucursal(id);

    res
      .status(200)
      .send({ message: `Sucursal con id ${id} eliminada correctamente` });
  } catch (error) {
    console.error("Error al eliminar sucursal:", error);
    res
      .status(500)
      .send({ message: "Error al eliminar sucursal", error: error.message });
  }
};

exports.readSucursalCompleta = async (req, res) => {
  const nombreSucursal = req.params.nombre;

  try {
    const resultado = await sucursalService.getSucursalConHorariosYAsientos(
      nombreSucursal
    );
    if (!resultado || resultado.length === 0) {
      return res.status(404).json({ mensaje: "Sucursal no encontrada" });
    }
    res.json(resultado);
  } catch (error) {
    console.error("Error en readSucursalCompleta -", error);
    res.status(500).json({ mensaje: error.message });
  }
};

exports.deleteHorario = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const hora = req.params.hora;

    const result = await sucursalService.deleteHorarioDeSucursal(id, hora);
    res.status(200).send({ message: "Horario eliminado", result });
  } catch (error) {
    res.status(500).send({ message: "Error al eliminar horario", error });
  }
};

exports.deleteAsiento = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const codigo = req.params.codigo;

    const result = await sucursalService.deleteAsientoDeSucursal(id, codigo);
    res.status(200).send({ message: "Asiento eliminado", result });
  } catch (error) {
    res.status(500).send({ message: "Error al eliminar asiento", error });
  }
};

exports.updateSucursalItems = async (req, res) => {
  try {
    const { id } = req.params;
    const sucursalActualizada = req.body;

    const sucursales = await sucursalService.updateSucursalItem(
      id,
      sucursalActualizada
    );

    if (sucursales.length === 0) {
      return res
        .status(404)
        .send("Error! No se encuentra la sucursal con el id: " + id);
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(sucursales);
  } catch (error) {
    console.log("Error en updateSucursalItems - " + error);
    res
      .status(500)
      .send({ code: 500, message: "Error al actualizar la sucursal" });
  }
};
