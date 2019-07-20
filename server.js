var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;

var app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

app.get("/scrape", function(req, res) {
    axios.get("https://www.everydayshouldbesaturday.com/").then(function(response) {
        var $ = cheerio.load(response.data);
        $("div.c-entry-box--compact--article").each(function(i, element) {
            var result = {};
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .text("href");
            db.Article.create(result).then(function(dbArticle) {
                console.log(dbArticle);
            })
            .catch(function(err) {
                console.log(err);
            });
        });
        res.send("Scrape Complete");
    });
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});