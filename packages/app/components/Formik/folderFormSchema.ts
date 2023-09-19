import * as yup from "yup";

const folderFormSchema = yup.object().shape({
	title: yup.string().required("Title is required"),
});
export default folderFormSchema;
export type TFolderFormSchema = yup.InferType<typeof folderFormSchema>;
