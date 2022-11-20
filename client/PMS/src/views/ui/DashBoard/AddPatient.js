import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPatient,
  createPatientStatus,
  getPatients,
} from "../../../redux/reducers/patientReducer";
import Validate from "../../../components/common/Validate";
import Loader from "../../../layouts/loader/Loader";
import ButtonSpinner from "../../../layouts/loader/Spinner";
import axios from "axios";

let API_URL = process.env.REACT_APP_API_UPLOAD
  ? process.env.REACT_APP_API_UPLOAD
  : "http://localhost:3001/v1/upload/";

const AddPatient = () => {
  const initialState = {
    fullName: "",
    email: "",
    contactNo: "",
    dob: "",
    gender: "",
    address: "",
    illness: [],
    images: "",
  };
  const [formValues, setFormValues] = useState(initialState);
  const [file, setFile] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  const status = useSelector(createPatientStatus);
  const patients = useSelector(getPatients);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = (e) => {
    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    axios.post(API_URL, data).then((response) => {
      if (response) {
        setUploading(false);
      }
      setFormValues({ ...formValues, ["images"]: response.data.url });
    });
  };

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  console.log(formValues, "values");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    setFormErrors(Validate(formValues));
    setSubmit(true);
    setLoading(true);
    console.log(formValues, "values2");

    dispatch(createPatient(formValues));
  };

  if (status === 201) {
    window.location.href = "/home";
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-plus-circle"> </i>
            Add Patient
          </CardTitle>
          <CardBody>
            <div className="container"></div>
            <Form onSubmit={handleSubmit}>
              <h5>Basic Information</h5>
              <hr></hr>
              <FormGroup>
                <Label for="labelName">FullName*</Label>
                <Input
                  id="labelName"
                  name="fullName"
                  placeholder="Enter Patient Name"
                  type="text"
                  value={formValues.fullName}
                  onChange={handleChange}
                />
                <p style={{ color: "red" }}> {formErrors.fullName}</p>
              </FormGroup>

              <FormGroup>
                <Label for="labelEmail">Email*</Label>
                <Input
                  id="labelEmail"
                  name="email"
                  placeholder="Enter Patient Email"
                  type="email"
                  value={formValues.email}
                  onChange={handleChange}
                />
                <p style={{ color: "red" }}> {formErrors.email}</p>
              </FormGroup>

              <FormGroup>
                <Label for="patientGender">Gender</Label>
                <br></br>
                <FormGroup className="form-check form-check-inline">
                  <Input
                    name="radio1"
                    type="radio"
                    value={formValues.gender}
                    onChange={handleChange}
                  />{" "}
                  <Label>Male</Label>
                </FormGroup>
                <FormGroup className="form-check form-check-inline">
                  <Input
                    name="radio1"
                    type="radio"
                    value={formValues.gender}
                    onChange={handleChange}
                  />{" "}
                  <Label check>Female</Label>
                </FormGroup>
                <FormGroup className="form-check form-check-inline">
                  <Input
                    name="radio1"
                    type="radio"
                    value={formValues.gender}
                    onChange={handleChange}
                  />{" "}
                  <Label check>Custom</Label>
                </FormGroup>
              </FormGroup>
              <FormGroup>
                <Label for="labelContactNumber">Contact Number*</Label>
                <Input
                  id="labelContactNumber"
                  name="contactNo"
                  placeholder="Enter Patient Contact Number"
                  type="text"
                  value={formValues.contactNo}
                  onChange={handleChange}
                />
                <p style={{ color: "red" }}> {formErrors.contactNo}</p>
              </FormGroup>

              <FormGroup>
                <Label for="labelDOB">DOB*</Label>
                <Input
                  id="labelDOB"
                  name="dob"
                  placeholder="Enter Patient DOB"
                  type="dob"
                  value={formValues.dob}
                  onChange={handleChange}
                />
                <p style={{ color: "red" }}> {formErrors.dob}</p>
              </FormGroup>

              <FormGroup>
                <Label for="labelAddress">Address*</Label>
                <Input
                  id="labelAddress"
                  name="address"
                  placeholder="Enter Patient Address"
                  type="text"
                  value={formValues.address}
                  onChange={handleChange}
                />
              </FormGroup>

              <h5>Images</h5>
              <hr></hr>

              <FormGroup>
                <FormGroup>
                  <Label for="label">Images</Label>
                  <Input
                    id="label"
                    name="file"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <Button onClick={uploadFile}>Upload</Button>
                </FormGroup>
              </FormGroup>

              {isUploading ? (
                <span>PLease wait file is uploading</span>
              ) : (
                <Button>Submit</Button>
              )}
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default AddPatient;
