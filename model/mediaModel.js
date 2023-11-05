//mediaModel.js

const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema(
  {
  
    recipe: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Media', MediaSchema);
