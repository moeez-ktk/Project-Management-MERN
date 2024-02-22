require("dotenv").config();
const express = require("express");
const cors = require("cors");
const task = require("./routes/task");

//express app
const app = express();

//middleware
app.use(express.json());
const corsOptions = {
  origin: "https://project-management-101.vercel.app/",
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

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

app.get("/", (req, res) => {
  res.json({ mssg: "Welcome to the app" });
});

// Routes
app.use("/api", task);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
