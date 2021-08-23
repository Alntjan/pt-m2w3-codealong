const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    title: String,
    description: String,
    author: String,
    rating: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = model('Book', schema);
