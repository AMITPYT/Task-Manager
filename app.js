const express = require("express");
require("./db");
const Task = require("./Routers/task");
const User = require("./Routers/user");

const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json());


app.use(Task, User)



app.listen(port, () => {
    console.log(`connection is setup at localhost:${port}`)
})