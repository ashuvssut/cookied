import * as yup from "yup";

export default yup.object().shape({
	title: yup
		.string()
		.required("title is a required"),
	url: yup.string().url().required("Url is Required"),
	flPath: yup.string().required("Folder Path is Required"),
});
