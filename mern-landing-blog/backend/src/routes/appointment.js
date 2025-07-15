const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Obtener todos los turnos
router.get('/', appointmentController.getAllAppointments);

// Crear un nuevo turno
router.post('/', appointmentController.createAppointment);

// Eliminar un turno por ID
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;