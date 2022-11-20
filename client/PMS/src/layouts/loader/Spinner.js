import React from "react";
import { Spinner } from "reactstrap";
const ButtonSpinner = () => (
  <div>
    <Spinner style={{ width: "2rem", height: "2rem" }} children={false} />
  </div>
);
export default ButtonSpinner;
