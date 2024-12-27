const express = require("express");
const app = express();
const PORT = "8088";
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Note = require("./model/noteModel");
const findDateandTime = require("./functions");

const { homeContent, aboutContent, contactContent } = require("./paragraph");

const MONGOOSE_URL = "mongodb://127.0.0.1:27017/noteDB";

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

app.get("/", async (request, response) => {
  const allNote = await Note.find({}).sort({ date: -1 });
  console.log(allNote);
  response.render("home.ejs", {
    title: "Home",
    paragraph: homeContent,
    allNote,
  });
});

app.get("/about", (request, response) => {
  response.render("about.ejs", { title: "About", paragraph: aboutContent });
});

app.get("/contact", (request, response) => {
  response.render("contact.ejs", {
    title: "Contact",
    paragraph: contactContent,
  });
});

app.get("/create", (request, response) => {
  response.render("create.ejs");
});

app.post("/create", async (request, response) => {
  const note = request.body.note;
  const currentDateWithTime = findDateandTime(note.date);
  note.date = currentDateWithTime;

  const newNote = new Note(note);
  await newNote.save();

  response.redirect("/");
});

app.get("/:id", async (request, response) => {
  const { id } = request.params;

  const note = await Note.findById(id);

  response.render("noteView.ejs", { note });
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
