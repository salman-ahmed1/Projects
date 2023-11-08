import express from "express";
import bodyparser from "body-parser";

const app = express();
const port = 3000;
var data = {};
const result = {};
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("./", (req, res) => {
  res.render("index.ejs", data);
});

app.post("./", async (req, res) => {
  data = { arrayIp, arrayDom, arrayReg, arrayReg2, arrayAdmin, arraytech };
  result = await res.redirect("/");
});

app.listen(port, () => {
  console.log(port, "server runnin on port");
});

// data = { arrayIp, arrayDom, arrayReg, arrayReg2, arrayAdmin, arraytech };
const arrayIp = ["addr", "country", "region"];
const arrayDom = ["domain", "created_date", "updated_date", "expiration_date"];
const arrayReg = ["name", "phone", "email", "referral_url"];
const arrayReg2 = ["organization", "province", "country", "email"];
const arrayAdmin = ["organization", "province", "country", "email"];
const arraytech = ["organization", "province", "country", "email"];
