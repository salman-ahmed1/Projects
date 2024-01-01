import { Express } from "express";
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

let books = [{ id: 1, title: "harry potash", comment: "Haram" }];

app.get("/", (req, res) => {
  res.render("index.ejs", books);
});

app.listen(port, () => {
  console.log("server runing at " + port);
});
