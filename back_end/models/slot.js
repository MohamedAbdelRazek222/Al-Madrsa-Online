const mongoose = require("mongoose");
const slotSchema = mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  meeting_id: {
    type: String
  },
  join_url: {
    type: String
  },
  start_url: {
    type: String
  }
});
module.exports = mongoose.model("Slot", slotSchema);
