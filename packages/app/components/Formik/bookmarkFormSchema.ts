import * as yup from "yup";

const bookmarkFormSchema = yup.object().shape({
	title: yup.string().required("Title is required"),
	url: yup.string().url("Must be a valid URL").required("URL is Required"),
	flPath: yup.string().required("Folder Path is Required"),
});

export default bookmarkFormSchema;
export type TBookmarkFormSchema = yup.InferType<typeof bookmarkFormSchema>;
