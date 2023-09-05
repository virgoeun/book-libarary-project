const express = require('express');
const router = express.Router(); //reading the router

/* GET home page */
router.get("/", (req, res, next) => { //not "app.get" (we use router we declared above) => because I don't want to have all routes in app
  res.render("index"); // usiing the router
});

// we don't want all routes in js file 
//sometimes we have so many routes like each page (app.get("/dfdf"), app.get("/dfdf22", app.get("/5993"))

module.exports = router; //exporting the router 
