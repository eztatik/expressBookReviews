const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4));

  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  const isbns = req.params.ISBN;
  let filtered_isbn = Object.values(books).filter((book) => book.ISBN == isbns);
  res.send(filtered_isbn[3]);
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here

  const authors = req.params.author;
  let filtered_author = Object.values(books).filter(
    (book) => book.author === authors
  );
  res.send(filtered_author);

  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  const title = req.params.title;
  let filtered_title = Object.values(books).filter(
    (book) => book.title === title
  );
  res.send(filtered_title);
  return res.status(300).json({ message: "Yet to be implemented" });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const isbns = req.params.ISBN;
  const review = req.params.review;
  let filtered_isbn = Object.values(books).filter((book) => book.ISBN == isbns);
  res.send(review);
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
