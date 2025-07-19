const Appointment = require('../models/Appointment');

// Obtener todos los turnos
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo turno
exports.createAppointment = async (req, res) => {
  try {
    const { name, email, phone, date, time, service, message } = req.body;
    
    // Crear el appointment con los datos del formulario
    const appointment = new Appointment({
      name,
      email,
      phone,
      date: new Date(date + 'T' + time), // Combinar fecha y hora
      service,
      message,
      createdAt: new Date()
    });
    
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    console.error('Error creating appointment:', err);
    res.status(400).json({ error: err.message });
  }
};

// Eliminar un turno por ID
exports.deleteAppointment = async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Turno no encontrado' });
    res.json({ message: 'Turno eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};