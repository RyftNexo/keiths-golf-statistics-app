const mongoose = require('mongoose')

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    shots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shot' }],
    totalShots: {
      type: Number,
      default: 0,
    },
  },
  { collection: 'club-data', timestamps: true }
)

const Club = mongoose.model('Club', clubSchema)

module.exports = Club

