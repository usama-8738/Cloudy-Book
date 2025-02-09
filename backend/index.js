const connectToDB = require("./db.js");
const express = require("express");
var cors = require("cors");

const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
//Connect To DataBase
connectToDB();

// Routes
app.use("/api/auth", require("./routes/UserRoute.js"));
app.use("/api/note", require("./routes/NoteRoute.js"));

app.listen(port, () => {
  console.log(`Cloudy Book listening on port http://localhost:${port}`);
});
