const { model, Schema } = require("mongoose");
const { connect } = require("./mongodbService");
connect("tecnomixservices");

const userSchema = new Schema({
  name: String,
  phone: Number
});

const users = new model("users", userSchema);

const workSchema = new Schema({
  user: String,
  description: String,
  receptionDate: Date,
  finished: Boolean,
  deliveryDate: Date,
  delivered: Boolean,
  accesories: String,
  notes: String,
  price: Number
})

const works = new model("works", workSchema);

const todoSchema = new Schema({
  text: String,
  completed: Boolean
})

const todos = new model("todos", todoSchema);


module.exports = { users, works, todos };