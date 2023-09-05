// We reuse this import in order to have access to the `body` property in requests
const express = require("express");

// ℹ️ Responsible for the messages you see in the terminal as requests are coming in
// https://www.npmjs.com/package/morgan

// middleware: every request from client 
// bascially communication log"ger (log every moves - every GET request)
// you can save it to the database(send); it's good for debugging!(error)
const logger = require("morgan");

// ℹ️ Needed when we deal with cookies (we will when dealing with authentication)
// https://www.npmjs.com/package/cookie-parser

//for uthentication 
//living in the brower, is a way, my credential is saved in the cookies
// e.g., gmail id/pw (clear cookies -> your data is not restored you gotta login again)
const cookieParser = require("cookie-parser");

// ℹ️ Serves a custom favicon on each request
// https://www.npmjs.com/package/serve-favicon

//now we use this, from the server side (not from client side using HTML)
const favicon = require("serve-favicon");

// ℹ️ global package used to `normalize` paths amongst different operating systems
// https://www.npmjs.com/package/path
const path = require("path");

// ======== Middleware configuration ========

// In programming, "configuration" refers to the process of setting up various parameters,
// options, settings, or properties that determine how a software application or system 
// behaves. Configuration allows developers or users to customize the behavior of the software 
// without having to modify its source code.

//arrow functions ("app" = parameter) to call all the declared ones above 
module.exports = (app) => {
  // In development environment the app logs
  app.use(logger("dev"));

  // To have access to `body` property in the request
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser()); 

  // Normalizes the path to the views folder
  app.set("views", path.join(__dirname, "..", "views"));
  // Sets the view engine to handlebars
  app.set("view engine", "hbs");
  // Handles access to the public folder
  app.use(express.static(path.join(__dirname, "..", "public")));

  // Handles access to the favicon
  app.use(favicon(path.join(__dirname, "..", "public", "images", "favicon.ico")));

};
