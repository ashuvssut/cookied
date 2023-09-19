import { FormikProps } from "formik";

export function checkError(formikProps: FormikProps<{}>, name: string) {
	const hasError = !!formikProps.errors[name] && formikProps.touched[name];
	return hasError ? formikProps.errors[name] : " ";
}
