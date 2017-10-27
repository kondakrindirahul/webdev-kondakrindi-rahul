module.exports = function (app) {
  app.get("/api/hello", hello);

  function hello(req, res) {
    res.send({message: "Hello from handler 123"});
  }
}


