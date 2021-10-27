const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const indexRoutes = require("./routes/index.routes");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

// mongodb connection
mongoose.connect(
  process.env.MONGO_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (error) => {
    if (!error) {
      console.log("MongoDb Connection Successful: ", process.env.MONGO_URL);
    } else {
      console.log("database not working", error);
    }
  }
);

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Admin Server");
});
app.use("/api", indexRoutes);

app.listen(PORT, () => {
  console.log("server is up and running on port", PORT);
});
