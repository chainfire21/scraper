const express = require("express");
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);
const app = express();
const db = mongoose.connection;
const PORT = process.env.PORT || 3001;
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("client/build"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes and give the server access to them.
require("./routes/api-routes.js")(app);

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  // Start our server so that it can begin listening to client requests.
  app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
});
