import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  Container,
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
  Alert,
} from "reactstrap";

import Loader from "../../../layouts/loader/Loader";
import { clearState, signIn } from "../../../redux/reducers/authReducer";
import { addToken } from "../../../redux/reducers/authReducer";
import ThemeRoutes from "../../../routes/DashBoardRouter";
import Validate from "../../../components/common/Validate";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [auth, setAuth] = useState("signin");
  const { isLoggedIn } = useSelector((state) => state.user.isLoggedIn);
  const { loading, error } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user.token);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    if (auth == "signin") {
      setFormErrors(Validate(formValues));
      setSubmit(true);
      dispatch(signIn(formValues));
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  useEffect(() => {
    dispatch(addToken());
  }, []);

  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/********Middle Content**********/}
        <Container className="p-4 wrapper" fluid>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-plus-circle"> </i>
              Login
            </CardTitle>

            {loading && <Loader />}

            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                  <p style={{ color: "red" }}> {formErrors.email}</p>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="password"
                    value={formValues.password}
                    onChange={handleChange}
                  />
                  <p style={{ color: "red" }}> {formErrors.password}</p>
                </FormGroup>
                <Button>Submit</Button>
                <span> Do not Have Account?Login</span>
                {error && <h5> {error}</h5>}
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </main>
  );
};
export default Login;
