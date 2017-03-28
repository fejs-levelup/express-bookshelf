const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  multer = require("multer"),
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      console.log(file);
      req.body.__savedFile = '/uploads/' + file.originalname;
      cb(null, file.originalname)
    }
  }),
  upload = multer({ storage });

let bookId = 2;
let books = [
  { bookId: 0, title: "Some Book 1", description: "Some description", author: "Bob", published: 1999 },
  { bookId: 1, title: "Some Book 2", description: "Another description", author: "Sam", published: 1999 }
];

let commentId = 2;
let comments = [
  { id: 0, content: "First comment", author: "Samantha", bookId: 0 },
  { id: 1, content: "Second comment", author: "Glen", bookId: 1 }
];

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { books });
});

app.route("/book/:id").
  get((req, res) => {
    let bookId = parseInt(req.params.id, 10);

    let book = books.find(book => book.bookId === bookId);

    if(!book) {
      return res.render("book/new", { id: bookId });
    }

    let bookComments = comments.filter(comment => comment.bookId === bookId);

    res.render("book/index", { book, comments: bookComments.reverse() });
  }).
  post(upload.single("cover"), (req, res) => {
    let id = parseInt(req.params.id, 10);

    console.log(req.body);

    let {
      title,
      description,
      author,
      published,
      __savedFile
    } = req.body;

    let book = {
      bookId: id,
      title,
      description,
      author,
      published,
      cover: __savedFile
    };

    books.push(book);

    res.render("book/index", { book, comments: [] });
  });

app.post("/comment", (req, res) => {
  let { content, author, bookId } = req.body;

  if(!content || !author || !bookId) {
    return res.status(400).send("Hey, it's not a valid request!!!");
  }

  let comment = {
    content, author,
    bookId: parseInt(bookId, 10),
    id: commentId++
  };

  comments.push(comment);
  res.send({ status: "ok", comment });
});

app.listen(5000, () => {
  console.log("Listen on port 5000");
});














