const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// All authors route
router.get("/", async (req, res) => {

  let searchOptions = {}

  if (req.query.name !== null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }

  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", {
      authors: authors,
      searchOpt: req.query
    });
  } catch {
    res.redirect("/");
  }
});

// New author route
router.get("/new", async (req, res) => {
  res.render("authors/new", {
    author: new Author(),
  });
});

// create author route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    // res.redirect(`authors/${newAuthor.id}`);

    res.redirect(`/authors`);
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
});

module.exports = router;

// author.save((err, newAuthor) => {
//   if (err) {
//     res.render("authors/new", {
//       author: author,
//       errMessage: "Error creating Author",
//     });
//   } else {
//     res.redirect(`/authors`);
//     // res.redirect(`authors/${newAuthor.id}`);
//   }
// });
