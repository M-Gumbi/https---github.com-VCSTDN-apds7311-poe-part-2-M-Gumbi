const express = require("express");
const app = express();

const urlprefix = "/api";
const mongoose = require("mongoose");
const Task = require("./models/task");
const fs = require("fs");
const taskRoutes = require("./routes/task");
const userRoutes = require("./routes/user");

//certificate
const cert = fs.readFileSync('keys/certificate.pem');
const options = {
  server: { sslCA: cert },
};

//connection string
const connstring =
 "mongodb+srv://meakengumbi11:2iD1gsE43KTILgyQ@cluster0.srhykjo.mongodb.net/";

mongoose
  .connect(connstring)
  .then(() => {
    console.log("Connected :-)");
  })
  .catch(() => {
    console.log("NOT connected :-(");
  }, options);

app.use(express.json());


app.use((reg, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use(urlprefix + "/task", taskRoutes);
app.use(urlprefix + "/users", userRoutes);


app.get(urlprefix + "/task", (req, res) => {
  Task.find().then((tasks) => {
    res.json({
      message: "Task found",
      tasks: tasks,
    });
  });

 
  app.post(urlprefix + "/task", (req, res) => {
    const tasks = new Task({
      task: req.body.task,
      branch: req.body.branch,
      department: req.body.department
    });
    tasks.save();
    res.status(201).json({
      message: "Task created",
      tasks: tasks,
    });
  });
});


app.delete(urlprefix + "/task/:id", (req, res) => {
  Taks.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({ message: "Task deleted" });
  });
});

module.exports = app;
