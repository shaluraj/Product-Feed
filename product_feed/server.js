const express = require("express");
const fileUpload = require("express-fileupload");
const xml2js = require("xml2js");

const app = express();
app.use(fileUpload());
const port = process.env.PORT || 5000;

const parser = new xml2js.Parser();

app.post("/upload", (req, res) => {
  if (!req.files) return res.status(400).send("No files were uploaded.");
  const fileData = req.files.feed.data.toString("utf8");
  parser.parseString(fileData, function(err, result) {
    // var books = result["Library"]["Books"]["0"];
    if (err) return res.send("Error");
    var book = result.Library.Books;
    res.send({
      succes: true,
      book
    });
  });
});

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
