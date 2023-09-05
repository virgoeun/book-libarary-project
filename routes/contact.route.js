const express = require('express');
const router = express.Router(); //reading the router

//use the router here
router.get("/contact", (req, res, next) => { //not "app.get" (we use router we declared above) => because I don't want to have all routes in app
  res.send("Hello from contact"); // usiing the router but we need require in app.js file (MUST)
});

//or 

// router.get("/", (req, res, next) => { //not "app.get" (we use router we declared above) => because I don't want to have all routes in app
//     res.send("Hello from contact"); // usiing the router but we need require in app.js file (MUST)
//   });  => this means not index but /contact but we have this on contact.route 

//if we have 
// const contactRoutes = require("./routes/contact.route");
// app.use("/contact", contactRoutes)
  
// either one (not both)

//because in the contact.route file we can have multiple routes 
// like /contact/:id , /contact/delete etc so we don't want to repete in that case, 
// we just write in app.js file /contact

// we don't want all routes in js file 
//sometimes we have so many routes like each page (app.get("/dfdf"), app.get("/dfdf22", app.get("/5993"))

module.exports = router; //exporting the router 
