const { model, Schema } = require("mongoose");
const { connect } = require("./mongodbService");
connect("reserva_canchas");

//------------------------------------------------------------

const userSchema = new Schema({
  id: String,
  name: String,
  phone: String,
  email: String,
  address: String
});
const users = new model("users", userSchema);

//------------------------------------------------------------

//------------------------------------------------------------
const workSchema = new Schema({
  //Datos del cliente
  user: String,

  //Datos del trabajo
  description: String,
  accesories: String,
  receptionDate: Date,

  //Estado
  finished: Boolean,
  delivered: Boolean,
  deliveryDate: Date,
  
  //Trabajo hecho
  notes: Array,
  price: Number
})

const works = new model("works", workSchema);

//------------------------------------------------------------

//------------------------------------------------------------
const todoSchema = new Schema({
  text: String,
  completed: Boolean
})

const todos = new model("todos", todoSchema);
//------------------------------------------------------------

//------------------------------------------------------------

const reservationSchema = new Schema({
  idUser : String,
  date : Date,
  paid : Boolean
})

const reservations = new model("reservations", reservationSchema);

//------------------------------------------------------------

const Cancha = new model('Cancha', {
  nombre: String,
  descripcion: String,
});

//---------------------------------

const Horario = new model('Horario', {
  cancha: { type: Schema.Types.ObjectId, ref: 'Cancha' },
  fecha: Date,
  hora: String,
  disponible: Boolean,
});

//---------------------------------------

const Reserva = new model('Reserva', {
  horario: { type: Schema.Types.ObjectId, ref: 'Horario' },
  nombre: String,
  telefono: String,
  estado: String, // 'pendiente', 'aceptada', 'rechazada'
});

//---------------------------------------------

module.exports = { users, works, todos, reservations, Reserva, Horario, Cancha };