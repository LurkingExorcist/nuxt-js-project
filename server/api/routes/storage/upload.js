module.exports.post = function(req, res, next) {
  try {
    res.json(req.file);
  } catch (e) {
    next(e);
  }
}