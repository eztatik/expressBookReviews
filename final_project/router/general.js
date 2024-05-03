const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

//Task 6
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

//Task 1
//Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4));

  return res.status(300).json({ message: "Yet to be implemented" });
});
//Task 10
function findBooks(books) {
  return new Promise((resolve, reject) => {
    if (books) {
      resolve(books);
    } else {
      reject("error finding books");
    }
  });
}
public_users.get("/", async function (req, res) {
  let allbooks = await findBooks(books);
  res.send(allbooks);
});

//task 2
// // Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
//   //Write your code here
//   const isbn = req.params.isbn;
//     if(books[isbn]){
//         res.send(books[isbn])
//     }
//  });

//task 11
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  findBooks(books[isbn]).then((result) => res.send(result));
});

//Task 3
// Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//   //Write your code here

//     const authors = req.params.author;
// let filtered_author = Object.values(books).filter(book => book.author === authors)
//     res.send(filtered_author);

//   return res.status(300).json({message: "Yet to be implemented"});
// });

//Task 12
public_users.get("/author/:author", async function (req, res) {
  //Write your code here
  const author = req.params.author;
  let allbooks = await findBooks(books);
  let filtered_author = Object.values(allbooks).filter(
    (allbook) => allbook.author === author
  );
  res.send(filtered_author);

  return res.status(300).json({ message: "Yet to be implemented" });
});

//Task 4
// Get all books based on title
// public_users.get('/title/:title',function (req, res) {
//   //Write your code here
//   const title = req.params.title;
// let filtered_title = Object.values(books).filter(book => book.title === title)
//     res.send(filtered_title);
//   return res.status(300).json({message: "Yet to be implemented"});
// });

//Task 13
public_users.get("/title/:title", async function (req, res) {
  //Write your code here
  const title = req.params.title;
  let allbooks = await findBooks(books);
  let filtered_title = Object.values(allbooks).filter(
    (allbook) => allbook.title === title
  );
  res.send(filtered_title);

  return res.status(300).json({ message: "Yet to be implemented" });
});

//Task 5
//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.send(books[isbn].reviews);
  }
});

module.exports.general = public_users;
