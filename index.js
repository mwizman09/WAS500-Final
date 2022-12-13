const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),
  booksController = require("./controllers/booksController"),
  layouts = require("express-ejs-layouts");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(layouts);
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());
app.use(booksController.logRequestPaths);

const methodOverride = require("method-override");
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

app.get("/", booksController.home);
app.get("/booklist", booksController.booklist);
app.get("/AtomicHabits.jpg", booksController.Atomic);
app.get("/Frankenstein.jpg", booksController.Frankenstein);
app.get("/MazeRunner.jpg", booksController.Maze);
app.get("/delete/:id", booksController.delete, booksController.redirectView);
app.post("/edit/save", booksController.save, booksController.redirectView);
app.get("/addnewbook", booksController.new);
app.post("/addnewbook/save", booksController.create, booksController.redirectView);


app.get(
  "/public/images/Frankenstein.jpg",
  booksController.Frankenstein,
  (req, res, next) => {
    res.render("books/book", { books: req.data });
  }
);

app.get(
  "/public/images/AtomicHabits.jpg",
  booksController.Atomic,
  (req, res, next) => {
    res.render("books/book", { books: req.data });
  }
);

app.get(
  "/public/images/MazeRunner.jpg",
  booksController.Maze,
  (req, res, next) => {
    res.render("books/book", { books: req.data });
  }
);

app.get(
  "/books/6383ae1ee91cba9e14287274",
  booksController.Book1,
  (req, res, next) => {
    res.render("books/book", { books: req.data });
  }
);

app.get(
  "/books/6383d124f0cf5aa115cdcfd6",
  booksController.Book2,
  (req, res, next) => {
    res.render("books/book", { books: req.data });
  }
);

app.get(
  "/books/6383ef75f0cf5aa115cdcfd8",
  booksController.Book3,
  (req, res, next) => {
    res.render("books/book", { books: req.data });
  }
);

app.get(
  "/admin",
  booksController.admin,
  (req, res, next) => {
    res.render("admin", { books: req.data });
  }
);

app.get(
  "/edit/:id",
  booksController.edit,
  (req, res, next) => {
    res.render("edit", { books: req.data });
  }
);


app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

const mongoose = require("mongoose");
const books = require("./models/books");

require("dotenv").config();
const uri = "mongodb+srv://mwizman:MyMongoDB@was500.wgke8yk.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});