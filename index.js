var express = require("express");
var fs = require("fs");

function loadTweets(callback) {
    fs.readFile("./tweets.json", "utf8", function(err, contents) {
        if (err) throw err;

        var tweets = JSON.parse(contents);
        

        callback(tweets);
    });
}

var app = express();

app.use(express.static("public"));

app.get("/api", function(req, res) {
    // loadTweets(function() {

    //     res.render("index", { title: "Hey", message: "Hello there!" });
    //     //res.send(tweets);
    // });
    var showAll = req.query.search === "" || req.query.search == undefined;
    var filter = req.query.search;
    loadTweets(function(tweets) {
        //var obj = { 1: "one", 2: "two", 3: "three" };
        var result = "";
        var count = 0;
        fs.readFile("./public/tweets/tweets-1.html", "utf8", function(err, contents) {
            if (err) throw err;
            result += contents;
            result += "<input type=\"text\" placeholder=\"";
            if (showAll) {
                result += "Search by User Name";
            } else {
                result += filter;
            }
            result += "\" name=\"search\">";
            result += "<button type=\"submit\"><i class=\"fa fa-search\"></i></button>";
            result += "</form></div></div><div class=\"row\">";

            tweets.filter(tweet => {
                return showAll || tweet.user.screen_name.toUpperCase().indexOf(filter.toUpperCase()) > -1;
            }).forEach(tweet => {
                var userName = tweet.user.screen_name;
                result += "<div class=\"col-md-6 col-xs-12\">";
                result += "  <div class=\"tweet\">";
                result += "    <div class=\"user\">";
                result += "      <img src=\"";
                result += tweet.user.profile_image_url;
                result += "\" alt=\"wmynuaa profile pic\">";
                result += "        <div class=\"user-name\">";
                result += tweet.user.screen_name;
                result += "        </div></div>";
                result += "<div class=\"date\">";
                result += tweet.user.created_at;
                result += "</div>";
                result += "<div class=\"text\">";
                result += tweet.text;
                result += "</div></div></div>";
                count ++;
            });
            console.log("I loaded " + count + " tweets");
            // for (var el in tweets) {
            //     var userName = tweets[el].user.screen_name;
            //     if (!showAll && userName.toUpperCase().indexOf(filter.toUpperCase()) <= -1) {
            //         continue;
            //     }
            //     result += "<div class=\"col-md-6 col-xs-12\">";
            //     result += "  <div class=\"tweet\">";
            //     result += "    <div class=\"user\">";
            //     result += "      <img src=\"";
            //     result += tweets[el].user.profile_image_url;
            //     result += "\" alt=\"wmynuaa profile pic\">";
            //     result += "        <div class=\"user-name\">";
            //     result += tweets[el].user.screen_name;
            //     result += "        </div></div>";
            //     result += "<div class=\"date\">";
            //     result += tweets[el].user.created_at;
            //     result += "</div>";
            //     result += "<div class=\"text\">";
            //     result += tweets[el].text;
            //     result += "</div></div></div>";
            // }
            fs.readFile("./public/tweets/tweets-2.html", "utf8", function(err, contents2) {
                if (err) throw err;
                result += contents2;
                res.send(result);
            });
            
        });
        //result += "<table>";
        //for (var el in tweets) {
        //    result += "<tr><td>" + el + "</td><td>" + tweets[el].user.name + "</td></tr>";
        //}
        //result += "</table>";
        
    });
    
    
});

app.listen(3000, function () {
    console.log("Server listing for connections on port 3000");
});
