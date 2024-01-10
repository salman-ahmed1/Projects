import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import axios from "axios";
const port = 3000;
const app = express();
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  port: 5432,
  password: "123Sal",
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

db.connect();

var list = [
  {
    id: 1,
    title: "পেয়ে গেল সে সারটিফিকেট",
    comment: "খুবই ভাল বই ",
    rating: "১০",
  },
];
var sort = "list.id";
var by = "ASC";
function getInfo(sort, by) {
  return (
    "SELECT list.title,list.comment,rating.mark FROM rating JOIN list ON list.id = rating.list_id ORDER BY " +
    sort +
    " " +
    by
  );
}

app.get("/", async (req, res) => {
  try {
    const result = await db.query(getInfo(sort, by));
    console.log(sort);
    // if (sort == "rating.mark") {
    //   result.rows.reverse();
    // }
    console.log(result.rows);
    res.render("index.ejs", { books: result.rows });
  } catch (err) {
    console.log(err);
    res.render("index.ejs", { books: list });
  }
});
app.post("/sort", (req, res) => {
  sort = req.body.sort;
  if (sort == "mark") {
    by = "DESC";
  } else {
    by = "ASC";
  }

  console.log(sort + "  sor ");
  res.redirect("/");
});

app.post("/", (req, res) => {
  // render window to do post new thigns to list
  res.render("new.ejs");
});
// add new things to database
app.post("/new", async (req, res) => {
  try {
    await db.query("INSERT INTO list(title,comment) VALUES($1,$2)", [
      req.body.title,
      req.body.comment,
    ]);
    db.query("INSERT INTO rating(mark) VALUES($1)", [req.body.mark]);
  } catch (error) {}
  res.redirect("/");
});
app.listen(port, () => {
  console.log("server runing at " + port);
});
