const { model, Schema } = require("mongoose");
const { connect } = require("./mongodbService");
connect("works");

//Meal es la base de la receta ej: hamburguesa
const userSchema = new Schema({
  name: String,
  email: String
});

//Topic son los aditivos que se le pueden agregar, ej: bacon, queso, huevo, jamon
const workSchema = new Schema({
  user: String,
  receptionDate: Date,
  isWorking: Boolean,
  deliveryDate: Date,
  price: Number
})


const users = new model("users", userSchema);
const works = new model("works", workSchema);

module.exports = { users, works };