module.exports = function (handler) {
  return async (req, res, next) => {
    console.log("pip");
    try {
      await handler(req, res);
    } catch (err) {
      next(err);
    }
  };
};
