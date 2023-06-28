const path = require("path");

class ReactEndpoint {
  constructor() {
    this.path = "*";
  }

  async callback(req, res) {
    try {
      res.sendFile(
        path.join(__dirname, "..", "..", "..", "build", "index.html")
      );
    } catch (error) {
      logger.error(error);
      res.status(500).send("");
    }
  }
}

const reactEndpoint = new ReactEndpoint();

module.exports = reactEndpoint;
