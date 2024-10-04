//EndPoint
const express = require("express");
const { Cancha, Reserva, Horario } = require("../services/models")

const router = express.Router();

router.post('/admin/canchas', async (req, res) => {
    const { nombre, descripcion } = req.body;
    const cancha = new Cancha({ nombre, descripcion });
    await cancha.save();
    res.json(cancha);
});
  
router.get('/admin/canchas', async (req, res) => {
    const canchas = await Cancha.find();
    res.json(canchas);
  });
  
  router.post('/admin/horarios', async (req, res) => {
    const { canchaId, fecha, hora } = req.body;
    const horario = new Horario({ cancha: canchaId, fecha, hora, disponible: true });
    await horario.save();
    res.json(horario);
});
  
router.get('/admin/horarios/:canchaId', async (req, res) => {
    const { canchaId } = req.params;
    const horarios = await Horario.find({ cancha: canchaId });
    res.json(horarios);
});
  
router.get('/admin/reservas/:canchaId/:fecha', async (req, res) => {
    const { canchaId, fecha } = req.params;
    const startOfDay = new Date(fecha);
    const endOfDay = new Date(fecha);
    endOfDay.setDate(endOfDay.getDate() + 1);
  
    const reservas = await Reserva.find({
      horario: {
        $in: await Horario.find({
          cancha: canchaId,
          fecha: { $gte: startOfDay, $lt: endOfDay }
        }).distinct('_id')
      }
    }).populate('horario');
    
    res.json(reservas);
});

router.put('/admin/reservas/:id', async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    const reserva = await Reserva.findByIdAndUpdate(id, { estado }, { new: true });
    if (estado === 'aceptada') {
      await Horario.findByIdAndUpdate(reserva.horario, { disponible: false });
    }
    res.json(reserva);
});
  
  // Rutas para el cliente
router.get('/client/canchas', async (req, res) => {
    const canchas = await Cancha.find();
    res.json(canchas);
});
  
router.get('/client/horarios/:canchaId', async (req, res) => {
    const { canchaId } = req.params;
    const horarios = await Horario.find({ cancha: canchaId, disponible: true });
    res.json(horarios);
});
  
router.post('/client/reservas', async (req, res) => {
    const { horarioId, nombre, telefono } = req.body;
    const reserva = new Reserva({
      horario: horarioId,
      nombre,
      telefono,
      estado: 'pendiente',
    });
    await reserva.save();
    res.json(reserva);
});

module.exports = router;