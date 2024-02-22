require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Check database connection
db.once("open", () => {
  console.log("Connected to MongoDB database");
});

// Define schema for your data
const taskSchema = new mongoose.Schema({
  customerName: String,
  category: String,
  budget: String,
  deadline: String,
  complete: Boolean,
});

// Create a model
const Task = mongoose.model("tasks", taskSchema);

//express app
const app = express();

//middleware
app.use(express.json());
const corsOptions = {
  origin: "https://project-management-101.vercel.app/",
  methods: ["GET", "POST", "PATCH","PUT", "DELETE"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ mssg: "Welcome to the app" });
});

// Route to get all table data
app.get("/api/task", async (req, res) => {
  try {
    const collection = db.collection("tasks");
    const tableData = await collection.find({}).toArray();
    res.send(tableData);
  } catch (error) {
    console.error("Failed to retrieve table data", error);
    res.status(500).send("Failed to retrieve table data");
  }
});

// Route to add new data to the table
app.post("/api/task", async (req, res) => {
  try {
    const newData = req.body;
    newData._id = new mongoose.Types.ObjectId();
    newData.complete = false;
    const newTask = new Task(newData);
    await newTask.save();
    res.send(newTask);
  } catch (error) {
    console.error("Failed to add new data to the table", error);
    res.status(500).send("Failed to add new data to the table");
  }
});

// Route to update task completion status
app.put("/api/task/:id", async (req, res) => {
  const id = req.params.id.toString(); 

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { complete: true });
    console.log(updatedTask)
    res.send(updatedTask);
  } catch (error) {
    console.error("Failed to update task completion status", error);
    res.status(500).send("Failed to update task completion status");
  }
});

// Route to delete a task
app.delete("/api/task/:id", async (req, res) => {
    const taskId = req.params.id;
  
    try {
      const deletedTask = await Task.findByIdAndDelete(taskId);
      if (!deletedTask) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json({ message: "Task deleted successfully", deletedTask });
    } catch (error) {
      console.error("Failed to delete task", error);
      res.status(500).json({ error: "Failed to delete task" });
    }
  });
  

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
