const Validate = (values) => {
  const errors = {};
  if (!values.fullName) {
    errors.fullName = "Full name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  }
  if (!values.contactNo) {
    errors.contactNo = "Contact No is required";
  }

  if (!values.dob) {
    errors.dob = "Date of Birth is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};

export default Validate;
