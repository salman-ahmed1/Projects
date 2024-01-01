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

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log("server runing at " + port);
});
