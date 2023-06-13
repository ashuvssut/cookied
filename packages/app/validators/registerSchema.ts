import * as yup from "yup";

export default yup.object().shape({
	name: yup.string().required("Name is required"),
	email: yup.string().email().required("Email is required"),
	password: yup
		.string()
		.required("Password is a required field")
		.min(7, "Password must be 8 characters long"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords must match")
		.required("Confirm Password is required"),
});
