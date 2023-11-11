import express from "express";
import bodyparser from "body-parser";
import axios from "axios";
const app = express();
const port = 3000;
var data = {};
var arrays;
var result = {};
var result2 = {};
var result3 = {};
const arrayIp = ["addr", "country", "region"];
const arrayDom = ["domain", "created_date", "updated_date", "expiration_date"];
const arrayReg = ["name", "phone", "email", "referral_url"];
const arrayReg2 = ["organization", "province", "country", "email"];
const arrayAdmin = ["organization", "province", "country", "email"];
const arraytech = ["organization", "province", "country", "email"];
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { data });
});

app.post("/", async (req, res) => {
  arrays = {
    arrayIp,
    arrayDom,
    arrayReg,
    arrayReg2,
    arrayAdmin,
    arraytech,
  };
  try {
    result = await axios.get(`https://scraper.run/dns?addr=${req.body.domain}`);
    var ip = result.data.ip[0];
    console.log(ip);
    try {
      result2 = await axios.get(`https://scraper.run/ip?addr=${ip}`);
      // console.log(JSON.stringify(result2.data));
      result3 = await axios.get(
        `https://scraper.run/whois?addr=${req.body.domain}`
      );

      Object.assign(data, result.data, result2.data, result3.data);
      data.arrays = arrays;
      console.log(data.domain[data.arrays.arrayDom[1]]);

      res.render("index.ejs", { data });
    } catch (error) {
      console.log(error.message + " req with ip");
    }
  } catch (error) {
    console.log(error.message + " domain get error");
    console.log(error);
    console.log(error.data);
    console.error;
  }
});

app.listen(port, () => {
  console.log(port, "server runnin on port");
});

// data = { arrayIp, arrayDom, arrayReg, arrayReg2, arrayAdmin, arraytech };
