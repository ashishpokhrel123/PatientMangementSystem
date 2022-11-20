const mongoose = require("mongoose");
const supertest = require("supertest");
const config = require("../src/config/keys");

const setUpDatabase = () => {
  beforeEach(async () => {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
  });

  afterEach(async (done) => {
    await mongoose.disconnect();
  });
};

module.exports = setUpDatabase;
