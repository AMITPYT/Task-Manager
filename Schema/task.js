const mongoose = require("mongoose")
const { Schema } = mongoose;

const TaskSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
     task_name:{
        type: String,
        required: true
    },
    due_Date: {
        type: String,
        required: true,
    },
    status:{
        type: String,
       default: "Pending"
    },


  });

  const Task = mongoose.model('Task',TaskSchema);
  module.exports = Task