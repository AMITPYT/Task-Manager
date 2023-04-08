const express = require("express");
const router = express.Router();
const Task = require("../Schema/task")
const { validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser.js")

router.post("/task/addtask", fetchuser, async (req, res) => {
    try {
        const {task_name,due_Date,status } = req.body;
  
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const task = new Task ({
          task_name,  
          due_Date,
          status,
          userid: req.user.id,
        });
        const savedbooking = await task.save();
  
        res.json({"Success": "Task Add Successfully",savedbooking});
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
});

router.get('/task/gettask', fetchuser, async (req, res) => {
    try {
        const gettask = await  Task.find({ userid: req.user.id });
        console.log(gettask);
        res.json(gettask)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/task/gettaskbyname', fetchuser, async (req, res) => {
    try {
        const gettask = await Task.find({task_name: req.body.task_name});
        res.json(gettask)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/task/gettaskbyduedate', fetchuser, async (req, res) => {
    try {
        const gettask = await Task.find({due_Date: req.body.due_Date});
        res.json(gettask)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.put('/updatetask/:id', fetchuser, async (req, res) => {
    try {

        const { task_name, due_Date, status } = req.body;
        // Create a new note Object
        const newTask = {};
        console.log(newTask);
        if (task_name) {
            newTask.task_name = task_name;
        }
        if (due_Date) {
            newTask.due_Date = due_Date;
        }
        if (status) {
            newTask.status = status;
        }
        // Find the note to be Updated and update it

        let task = await Task.findById(req.params.id);
        console.log(task);
        if (!task) {
            return res.status(404).send('Not found');
        }
        // note.user.toString is given the user id 
        if (task.userid.toString() !== req.user.id) {
            return res.status(401).send('Not allowed');
        }
        task = await Task.findByIdAndUpdate(req.params.id, { $set: newTask }, { new: true })
        console.log(task);
        res.json({ task });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


})


router.delete('/deletetask/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it

        let task = await  Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send('Not found');
        }
        // Allow deletion only if the user own this Notic
        if (task.userid.toString() !== req.user.id) {
            return res.status(401).send('Not allowed');
        }
        task = await Task.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Task Deleted Successfully", task: task });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});
module.exports = router;