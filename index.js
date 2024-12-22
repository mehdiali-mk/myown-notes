const express = require("express");
const app = express();
const PORT = "8088";
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGOOSE_URL = "mongodb://127.0.0.1:27017/example";

main()
  .then(() => {
    console.log("Database is connected...");
  })
  .catch((error) => {
    console.log(error.message);
  });

async function main() {
  await mongoose.connect(MONGOOSE_URL);
}

app.set("view engine", "ejs");
app.set("/views", path.join(__dirname + "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname + "/public")));

app.get("/", (request, response) => {
  response.render("example.ejs");
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
