import * as yup from "yup";

export default yup.object().shape({
	email: yup
		.string()
		.email("Invalid Email address")
		.required("Email is a required"),
	password: yup
		.string()
		.required("Password is a required field")
		.min(8, "Password must be 8 characters long"),
});
