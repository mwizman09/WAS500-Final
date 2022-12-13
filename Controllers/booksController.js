const books = require("../models/books");

module.exports = {

logRequestPaths: (req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
},
booklist: (req, res, next) => {
  res.render("booklist")
},
home: (req, res, next) => {
  res.render("index");
},
Atomic: (req, res, next) => {
  res.sendFile("AtomicHabits.jpg", { root: './public/images/' })

},
Frankenstein: (req, res, next) => {
  res.sendFile("Frankenstein.jpg", { root: './public/images/' })

},
Maze: (req, res, next) => {
  res.sendFile("MazeRunner.jpg", { root: './public/images/' })

},
Book1: (req, res, next) => {
  books.find({_id: "6383ae1ee91cba9e14287274"}, (error, book) => {
    if (error) next(error);
    req.data = book;
    next();
  });
},
Book2: (req, res, next) => {
  books.find({_id: "6383d124f0cf5aa115cdcfd6"}, (error, book) => {
    if (error) next(error);
    req.data = book;
    next();
  });
},
Book3: (req, res, next) => {
  books.find({_id: "6383ef75f0cf5aa115cdcfd8"}, (error, book) => {
    if (error) next(error);
    req.data = book;
    next();
  });
},
admin: (req, res, next) => {
  books.find({}, (error, book) => {
    if (error) next(error);
    req.data = book;
    next();
  });
},
delete: (req, res, next) => {
  let bookId = req.params.id;
  books.findByIdAndRemove(bookId)
    .then(() => {
      res.locals.redirect = "/admin";
      next();
    })
    .catch(error => {
      console.log(`Error deleting user by ID: ${error.message}`);
      next();
    })
},
redirectView: (req, res, next) => {
  let redirectPath = res.locals.redirect;
  if (redirectPath) res.redirect(redirectPath);
  else next();
},
edit: (req, res, next) => {
  let bookId = req.params.id
  books.find({_id: bookId}, (error, book) => {
    if (error) next(error);
    req.data = book;
    next();
  });
},
save: (req, res, next) => {
  let id = {
    _id: req.body.ID
  }
  let userParams = {
    Name: req.body.Name,
    Author: req.body.Author,
  };
  books.findByIdAndUpdate(id, userParams)
  .then(()=> {
    res.locals.redirect = "/admin";
    next();
  })
  .catch(error => {
    console.log(`Error saving user: ${error.message}`);
    next(error);
  }); 
},
new: (req, res) => {
  res.render("new");
},
create: (req, res, next) => {
  let userParams = {
    Name: req.body.Name,
    Author: req.body.Author,
  };
  books.create(userParams)
    .then(() => {
      res.locals.redirect = "/admin";
      next();
    })
    .catch(error => {
      console.log(`Error saving user: ${error.message}`);
      next(error);
    });
}
};