// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db"); //just require it, not exporting it 
// this executes all here 

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "library-project";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);
//exported from index.routes.js file

// const contactRoutes = require("./routes/contact.route");
// app.use("/", contactRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
//should be at the end of app.js file (otherewise, it throws an error )
// all the previews or routes fail, pass it to the middleware
require("./error-handling")(app);

//this one line bascially is the same with the two lines
// const errorHandler = require("./error-handling")
// errorHandler(app)//using app parameter

module.exports = app;
//using all apps -> we exporting the app 