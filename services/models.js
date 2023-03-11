const { model, Schema } = require("mongoose");
const { connect } = require("./mongodbService");
connect("tecnomixservices");

const userSchema = new Schema({
  name: String,
  number: Number
});

const workSchema = new Schema({
  user: String,
  description: String,
  receptionDate: Date,
  finished: Boolean,
  deliveryDate: Date,
  price: Number
})


const users = new model("users", userSchema);
const works = new model("works", workSchema);

module.exports = { users, works };