const graphController = function (addr, title, res) {
  res.render(`${addr}`, { title: title, type: "bar" });
};

module.exports = { graphController };
