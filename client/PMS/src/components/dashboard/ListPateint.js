import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
  Input,
  FormGroup,
} from "reactstrap";
import {
  fetchOnePatient,
  fetchPatient,
  getPatients,
} from "../../redux/reducers/patientReducer";
import NoData from "./NoData";

const convertDate = (date) => {
  console.log(date, "date");
  const convertedDate = new Date(date).toLocaleDateString("US");

  return convertedDate.replace("/", "-");
};

const PatientList = () => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const patientList = useSelector(getPatients);
  const patient = useSelector((state) => state.patient.patients);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    dispatch(fetchPatient());
  }, []);

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">All Patient</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6"></CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>FullName</th>
                <th>Email</th>

                <th>Contact No</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Address</th>

                <th>Action</th>
                <th>Mark</th>
              </tr>
            </thead>
            <tbody>
              {patient.length > 0 ? (
                patientList.map((data, index) => (
                  <tr key={index} className="border-top">
                    <td>{data.fullName}</td>
                    <td>{data.email}</td>
                    <td>{data.contactNo}</td>

                    <td>{convertDate(data.dob)}</td>

                    <td>Male</td>
                    <td>{data.address}</td>

                    <td>
                      <Link to={`/patient/edit/${data._id}`}>
                        <span className="d-inline-block ms-4">
                          <i class="bi bi-pencil"></i>
                        </span>
                      </Link>
                      <span className=" rounded-circle d-inline-block ms-4">
                        <i class="bi bi-trash"></i>
                      </span>

                      {/* <span className=" rounded-circle d-inline-block ms-4">
                        {" "}
                        <i class="bi bi-arrow-down-short"></i>
                      </span> */}
                    </td>
                    <td>
                      <FormGroup check className="form-check">
                        <Input
                          type="checkbox"
                          checked={isChecked}
                          onChange={handleOnChange}
                        />
                      </FormGroup>
                    </td>
                  </tr>
                ))
              ) : (
                <NoData />
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default PatientList;
