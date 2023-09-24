// Form fields who do no need formikProps.setFieldValue will stay here
import { Th } from "app/theme/components";
import { ComponentProps, FC } from "react";
import { FormikProps } from "formik";
import { Text } from "dripsy";
import { checkError } from "app/components/Formik/FormFields/utils";

interface IFormTextField<T extends FormikProps<any>> {
	formikProps: T;
	name: string;
	fieldProps?: ComponentProps<typeof Th.TextInput>;
}

export const FormTextField = <T extends FormikProps<any>>(
	{ formikProps: p, fieldProps, name }: IFormTextField<T>, //
) => {
	return (
		<>
			<Th.TextInput
				value={p.values[name]}
				onChangeText={p.handleChange(name)}
				autoCorrect={false}
				onBlur={p.handleBlur(name)}
				{...fieldProps}
			/>
			<Text sx={{ color: "error" }}>{checkError(p, name)}</Text>
		</>
	);
};
