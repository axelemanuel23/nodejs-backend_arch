const { model, Schema } = require("mongoose");
const { connect } = require("./mongodbService");
connect("test");

const userSchema = new Schema({
  id: String,
  name: String,
  phone: Number,
  email: String,
  address: String
});

const users = new model("users", userSchema);

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

const todoSchema = new Schema({
  text: String,
  completed: Boolean
})

const todos = new model("todos", todoSchema);


module.exports = { users, works, todos };