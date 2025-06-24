const { param } = require("../routers/RouterAsientos");
const asientoService = require("../services/asientoService");

exports.readAsientos = async (req, res) => {
  try {
    const ordenar = req.query.ordenar || "ASC";
    const asientos = await asientoService.getTodosAsientos(ordenar);
    res.json(asientos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener asientos", error: error.message });
  }
};

exports.readAsientoSolo = async (req, res) => {
  try {
    const nombreAsiento = req.params.asiento;
    const asiento = await asientoService.getAsientoSoloPorNombre(nombreAsiento);
    if (!asiento)
      return res.status(404).json({ message: "Asiento no encontrado" });

    res.json(asiento);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener asiento", error: error.message });
  }
};

exports.createAsiento = async (req, res) => {
  try {
    const asientoNuevo = req.body;
    const resultado = await asientoService.createNewAsiento(asientoNuevo);
    res.status(201).json(resultado);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear asiento", error: error.message });
  }
};
exports.updateAsiento = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { SUCURSAL_ID, CODIGO } = req.body;

    if (!SUCURSAL_ID || !CODIGO) {
      return res
        .status(400)
        .json({ message: "Faltan datos obligatorios: SUCURSAL_ID y CODIGO" });
    }

    const resultado = await asientoService.updateAsiento(id, {
      SUCURSAL_ID,
      CODIGO,
    });

    if (!resultado) {
      return res.status(404).json({ message: "Asiento no encontrado" });
    }

    res.json({ message: "Asiento actualizado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar asiento",
      error: error.message,
    });
  }
};

exports.deleteAsiento = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).send("ID inválido");
    }

    await asientoService.deleteAsiento(id);

    res
      .status(200)
      .send({ message: `Asiento con id ${id} eliminado correctamente` });
  } catch (error) {
    console.error("Error al eliminar asiento:", error);
    res
      .status(500)
      .send({ message: "Error al eliminar asiento", error: error.message });
  }
};

exports.readAsientoCompleto = async (req, res) => {
  const nombreAsiento = req.params.nombre;

  try {
    const resultado = await asientoService.getAsientoConSucursal(nombreAsiento);
    if (!resultado || resultado.length === 0) {
      return res.status(404).json({ mensaje: "Asiento no encontrado" });
    }
    res.json(resultado);
  } catch (error) {
    console.error("Error en readAsientoCompleto -", error);
    res.status(500).json({ mensaje: error.message });
  }
};

exports.updateAsientoItems = async (req, res) => {
  try {
    const { id } = req.params;
    const asientoActualizado = req.body;

    const asientos = await asientoService.updateAsientoItem(
      id,
      asientoActualizado
    );

    if (asientos.length === 0) {
      return res
        .status(404)
        .send("Error! No se encuentra el asiento con el id: " + id);
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(asientos);
  } catch (error) {
    console.log("Error en updateAsientoItems - " + error);
    res
      .status(500)
      .send({ code: 500, message: "Error al actualizar el asiento" });
  }
};
