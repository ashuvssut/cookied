import { Formik, FormikProps } from "formik";
import { Text, View } from "dripsy";

import registerSchema from "../../validators/registerSchema";
import { GoodCookie } from "../../assets/svg";
import { Svg } from "app/components/Svg";
import { Th } from "app/theme/components";
import { StatusBar } from "app/components/StatusBar";
import { TextLink } from "solito/link";
import { usePlatformAuth } from "app/hooks/usePlatformAuth";
import { KeyboardUsingScreen } from "app/components/KeyboardUsingScreen";
import { Header } from "app/components/Header";
import Screen from "app/components/Screen";

const RegisterScreen = () => {
	const { register } = usePlatformAuth();
	return (
		<Screen sx={{ alignItems: "center" }}>
			<KeyboardUsingScreen keyboardShouldPersistTaps="always">
				<StatusBar style="light" />
				<Header />
				<View sx={{ px: 30 }}>
					<View variant="layout.center" sx={{ width: [null, 600, 700] }}>
						<Svg
							Svg={GoodCookie}
							webSvgProps={{ style: { height: 200 } }}
							nativeSvgProps={{ height: 200 }}
						/>
					</View>
					<Formik
						initialValues={{
							name: "",
							email: "",
							password: "",
							confirmPassword: "",
						}}
						validationSchema={registerSchema}
						validateOnMount
						onSubmit={(value: IFormIntitalState) => {
							register(value.name, value.email, value.password);
						}}
					>
						{p => (
							<>
								<Text variant="label">Name</Text>
								<Th.TextInput
									value={p.values.name}
									onChangeText={p.handleChange("name")}
									autoCorrect={false}
									onBlur={p.handleBlur("name")}
									placeholder="Enter Name"
									textContentType="username"
								/>
								{
									<Text sx={{ color: "error" }}>
										{checkError(p, "name") ? p.errors.name : " "}
									</Text>
								}
								<Text variant="label">Email</Text>
								<Th.TextInput
									value={p.values.email}
									onChangeText={p.handleChange("email")}
									autoCorrect={false}
									onBlur={p.handleBlur("email")}
									placeholder="Enter Email"
									textContentType="emailAddress"
									keyboardType="email-address"
								/>
								{
									<Text sx={{ color: "error" }}>
										{checkError(p, "email") ? p.errors.email : " "}
									</Text>
								}
								<Text variant="label">Password</Text>
								<Th.TextInput
									value={p.values.password}
									onChangeText={p.handleChange("password")}
									autoCorrect={false}
									keyboardType="visible-password"
									onBlur={p.handleBlur("password")}
									placeholder="Enter Password"
									textContentType="password"
								/>
								{
									<Text sx={{ color: "error" }}>
										{checkError(p, "password") ? p.errors.password : " "}
									</Text>
								}
								<Text variant="label">Confirm Password</Text>
								<Th.TextInput
									value={p.values.confirmPassword}
									onChangeText={p.handleChange("confirmPassword")}
									autoCorrect={false}
									keyboardType="visible-password"
									onBlur={p.handleBlur("confirmPassword")}
									placeholder="Confirm Password"
									textContentType="password"
								/>
								{
									<Text sx={{ color: "error" }}>
										{checkError(p, "confirmPassword")
											? p.errors.confirmPassword
											: " "}
									</Text>
								}
								<Th.ButtonPrimary // @ts-ignore
									onPress={p.isValid ? p.handleSubmit : () => {}}
									disabled={!p.isValid}
								>
									Sign Up
								</Th.ButtonPrimary>
								<Text sx={{ textAlign: "center", py: "$3" }}>
									Already have an account?{" "}
									<TextLink href="/login">
										<Text variant="link">Log In</Text>
									</TextLink>
								</Text>
							</>
						)}
					</Formik>
				</View>
			</KeyboardUsingScreen>
		</Screen>
	);
};

export default RegisterScreen;

function checkError(
	formikProps: FormikProps<IFormIntitalState>,
	fieldKey: keyof IFormIntitalState,
) {
	const p = formikProps;
	return !!(
		!!p.values[fieldKey].length &&
		p.errors[fieldKey] &&
		p.touched[fieldKey]
	);
}

interface IFormIntitalState {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}
