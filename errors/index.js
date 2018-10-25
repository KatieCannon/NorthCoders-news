exports.handle400s = (err, req, res, next) => {
    
  if (err.status === 400) res.status(400).send({ status: 400, msg: "bad request" });
  else next(err);
};

exports.handle404s = (err, req, res, next) => {
    console.log(err)
  if (err.status === 404) res.status(404).send({ status: 404, msg: "page not found" })
  else next(err);
};

exports.handle500s = (err, req, res, next) => {
    //console.log(err)
  res.send({ status: 500, msg: "internal server error" });
};
