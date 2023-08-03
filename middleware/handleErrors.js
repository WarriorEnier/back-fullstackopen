module.exports = (error, req, res, next) => {
  console.log(error.name);
  if (error.name) res.status(400).send({ error: "id invalid" });
  else res.status(500).end();
};
