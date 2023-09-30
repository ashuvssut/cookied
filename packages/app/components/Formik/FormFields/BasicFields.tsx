// Form fields who do no need formikProps.setFieldValue will stay here
import { Th } from "app/theme/components";
import { ComponentProps, FC } from "react";
import { FormikProps } from "formik";
import { Text, View } from "dripsy";
import { checkError } from "app/components/Formik/FormFields/utils";

interface IFormTextField<T extends FormikProps<any>> {
	formikProps: T;
	name: string;
	fieldProps?: ComponentProps<typeof Th.TextInput>;
	endCompo?: JSX.Element;
}

export const FormTextField = <T extends FormikProps<any>>(
	{ formikProps: p, fieldProps, name, endCompo }: IFormTextField<T>, //
) => {
	return (
		<>
			<View sx={{ justifyContent: "center", width: "100%" }}>
				<Th.TextInput
					value={p.values[name] || ""}
					onChangeText={p.handleChange(name)}
					autoCorrect={false}
					onBlur={p.handleBlur(name)}
					{...fieldProps}
				/>
				{endCompo}
			</View>
			<Text sx={{ color: "error" }}>{checkError(p, name)}</Text>
		</>
	);
};
