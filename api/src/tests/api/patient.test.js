const server = require("../../app");
const supertest = require("supertest");
const patient = require("../../models/patient");
const httpStatus = require("http-status");

test("GET /v1/patient", async () => {
  const patient = await patient.create({
    fullName: "Aashish Pokhrel",
    email: "aashishpokhrel146@gmail.com",
    contactNo: "9860409629",
    dob: "1997-09-27",
    address: "Kathmandu",
    images: "oMbLbSqGeW-sirimomina.jpeg",
  });

  await supertest(server)
    .get("/v1/patient")
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);

      // Check data
      expect(response.body[0]._id).toBe(patient.id);
      expect(response.body[0].fullName).toBe(patient.fullName);
      expect(response.body[0].email).toBe(patient.email);
      expect(response.body[0].contactNo).toBe(patient.contactNo);
      expect(response.body[0].dob).toBe(patient.dob);
      expect(response.body[0].address).toBe(patient.address);
      expect(response.body[0].images).toBe(patient.images);
    });
});

test("POST /v1/patient/", async () => {
  const data = await patient.create({
    fullName: "Aashish Pokhrel",
    email: "aashishpokhrel146@gmail.com",
    contactNo: "9860409629",
    dob: "1997-09-27",
    address: "Kathmandu",
    images: "oMbLbSqGeW-sirimomina.jpeg",
  });

  await supertest(app)
    .get("/v1/patient")
    .expect(httpStatus(201))
    .then(async (response) => {
      // check response
      expect(response.body._id).toBeTruthy();
      expect(response.body.fullName).toBe(data.fullName);
      expect(response.body.email).toBe(data.email);
      expect(response.body.contactNo).toBe(data.contactNo);
      expect(response.body.dob).toBe(data.dob);
      expect(response.body.address).toBe(data.address);
      expect(response.body.images).toBe(data.images);

      // check data in database
      const patient = await patient.findOne({ _id: response.body._id });
      expect(patient).toBeTruthy();
      expect(patient.fullName).toBe(data.fullName);
      expect(patient.email).toBe(data.email);
      expect(patient.contactNo).toBe(data.contactNo);
      expect(patient.dob).toBe(data.dob);
      expect(patient.address).toBe(data.address);
      expect(patient.images).toBe(data.images);
    });
});

test("PUT /v1/patient/:id", async () => {
  const patient = await patient.create({
    fullName: "Aashish Pokhrel",
    email: "aashishpokhrel146@gmail.com",
    contactNo: "9860409629",
    dob: "1997-09-27",
    address: "Kathmandu",
    images: "oMbLbSqGeW-sirimomina.jpeg",
  });

  const data = {
    fullName: "Aashish Pokhrel",
    email: "aashishpokhrel146@gmail.com",
    contactNo: "9860409629",
    dob: "1997-09-27",
    address: "Pokhara",
    images: "oMbLbSqGeW-sirimomina.jpeg",
  };

  await supertest(server)
    .patch("/v1/patient" + patient.id)
    .send(data)
    .expect(200)
    .then(async (response) => {
      // Check the response
      expect(response.body[0]._id).toBe(patient.id);
      expect(response.body[0].fullName).toBe(patient.fullName);
      expect(response.body[0].email).toBe(patient.email);
      expect(response.body[0].contactNo).toBe(patient.contactNo);
      expect(response.body[0].dob).toBe(patient.dob);
      expect(response.body[0].address).toBe(patient.address);
      expect(response.body[0].images).toBe(patient.images);

      // Check the data in the database
      const patient = await patient.findOne({ _id: response.body._id });
      expect(patient).toBeTruthy();
      expect(patient.fullName).toBe(data.fullName);
      expect(patient.email).toBe(data.email);
      expect(patient.contactNo).toBe(data.contactNo);
      expect(patient.dob).toBe(data.dob);
      expect(patient.address).toBe(data.address);
      expect(patient.images).toBe(data.images);
    });
});

test("DELETE /v1/patient/:id", async () => {
  const patient = await patient.create({
    fullName: "Aashish Pokhrel",
    email: "aashishpokhrel146@gmail.com",
    contactNo: "9860409629",
    dob: "1997-09-27",
    address: "Kathmandu",
    images: "oMbLbSqGeW-sirimomina.jpeg",
  });

  await supertest(server)
    .delete("/v1/patient/" + patient.id)
    .expect(204)
    .then(async () => {
      expect(await patient.findOne({ _id: patient.id })).toBeFalsy();
    });
});
