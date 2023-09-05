module.exports = (app) => {
  app.use((req, res, next) => {
    // this middleware runs whenever requested page is not available
    // this guarantee you that you direct to this page whenever you have an error
    res.status(404).render("not-found"); //render "non-found.hbs" file
  });

  app.use((err, req, res, next) => {
    // whenever you call next(err), this middleware will handle the error
    // always logs the error
    console.error("ERROR", req.method, req.path, err); // HTTP method: URL path & method 
    // this is on TERMINAL to developers (not clients) 

    // only render if the error ocurred before sending the response (to the client)
    if (!res.headersSent) { //true or false (true = you already sent the response to the client no need to send
      // if false; send status)
      // 500 Internal Server Error

      res.status(500).render("error");
    }
  });
};
