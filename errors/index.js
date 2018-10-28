exports.handle400s = (err, req, res, next) => {
    if(err.name === 'ValidationError')res.status(400).send({status:400, msg:"invalid input types"})
  if (err.status === 400) res.status(400).send({ status: 400, msg: err.msg || "bad request" });
  else next(err);
};

exports.handle404s = (err, req, res, next) => {
  if (err.status === 404) res.status(404).send({ status: 404, msg: err.msg || "page not found" })
  else next(err);
};

exports.handle500s = (err, req, res, next) => {
    //console.log(err)
  res.send({ status: 500, msg: "internal server error" });
};
