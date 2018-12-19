const cheerio = require("cheerio");
const axios = require("axios");

// First, tell the console what server3.js is doing
console.log("\n******************************************\n" +
            "Look at the image of every award winner in \n" +
            "one of the pages of `awwwards.com`. Then,\n" +
            "grab the image's source URL." +
            "\n******************************************\n");

// Make request via axios to grab the HTML
axios.get("https://www.npr.org/sections/world/").then(function(response) {

  // Load the HTML into cheerio
  const $ = cheerio.load(response.data);

  // Make an empty array for saving our scraped info
  const results = [];

  $("div.item-info").each(function(i, element) {

    const title = $(element).find("h2").find("a").text();
    const summary = $(element).find("p").find("a").text();
    const url = $(element).find("h2").find("a").attr("href");

    results.push({ title: title, summary: summary, url: url });
  });


  console.log(results);
});
