const { model, Schema } = require("mongoose");
const { connection } = require("./mongodbService");
connection.once("works");

//Meal es la base de la receta ej: hamburguesa
const userSchema = new Schema({
  name: String,
  email: String
});

//Topic son los aditivos que se le pueden agregar, ej: bacon, queso, huevo, jamon
const workSchema = new Schema({
  user: String,
  receptionDate: Date,
  isWorking: boolean,
  deliveryDate: Date,
  price: float
})


const users = new model("users", userSchema);
const works = new model("works", workSchema);

module.exports = { users, works };