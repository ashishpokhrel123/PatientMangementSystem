const server = require("../../app");
const supertest = require("supertest");
const user = require("../../models/patient");
const httpStatus = require("http-status");
const { request } = require("../../app");
const bcrypt = require("bcryptjs");
const { mongoose } = require("../../config/keys");

beforeEach(async () => {
  await user.deleteMany();
});

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

test("Should signup a new user", async () => {
  const response = await request(server)
    .post("/v1/users/signup")
    .send({ email: "test@gmail.com", password: hashPassword("Test@123") });
}).expect(201);

//assert in database
const user = await user.findById(response.body.user._id);
expect(response.body).toMatchObject({
  user: {
    email: "test@123",
    password: hashPassword("Test@123"),
  },
});

expect(user.password).not.toBe(hashPassword("Test@123"));

const oneUserId = new mongoose.Types.ObjectId();
const userOne = {
  _id: oneUserId,
  email: "aashishpokhrel146@gmail.com",
  password: "Hashish@123",
};

beforeEach(async () => {
  await user.deleteMany();
  const user = user(userOne);
  await user.save();
});

test("Should signing existing user", async () => {
  const response = await request(server)
    .post("/v1/users/signin")
    .send({ email: userOne.email, password: userOne.password })
    .expect(200);
  const user = await user.findById(userOneId).expect(response.body.token);
});
