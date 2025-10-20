const express = require("express");
const cors = require("cors");
const kategoriak = require("./modules/kategoriak");
const forgalom = require("./modules/forgalom");
const statistics = require("./modules/statistics");
const vevok = require("./modules/vevok");
const arlista = require("./modules/arlista");
const app = express();

// Middlewarek
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bajai SZC Türr István Technikum.");
});

app.use("/kategoria", kategoriak);
app.use("/forgalom", forgalom);
app.use("/statistics", statistics);
app.use("/vevok", vevok);
app.use("/arlista", arlista);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
