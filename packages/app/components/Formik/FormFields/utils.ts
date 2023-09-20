import { FormikProps } from "formik";

export function checkError(formikProps: FormikProps<any>, name: string) {
	const hasError = !!formikProps.errors[name] && formikProps.touched[name];
	const errorTxt = hasError ? formikProps.errors[name] : " ";
	return String(errorTxt);
}
