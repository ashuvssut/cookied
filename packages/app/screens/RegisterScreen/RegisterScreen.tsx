import { StyleSheet } from "react-native";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { H1, Text, View } from "dripsy";

import registerSchema from "../../validators/registerSchema";
import { GoodCookie } from "../../assets/svg";
import { Svg } from "app/components/Svg";
import { Th } from "app/theme/components";
import { StatusBar } from "app/components/StatusBar";
import { useSafeArea } from "app/components/SafeArea/useSafeArea";
import { TextLink } from "solito/link";
import { usePlatformAuth } from "app/hooks/usePlatformAuth";
import { KeyboardUsingScreen } from "app/components/KeyboardUsingScreen";

type Props = {};

const RegisterScreen = (props: Props) => {
	const { register } = usePlatformAuth();
	const inset = useSafeArea();
	return (
		<View
			sx={{
				pt: inset.top,
				height: "100%",
				bg: "primary",
				alignItems: "center",
			}}
		>
			<KeyboardUsingScreen keyboardShouldPersistTaps="always">
				<StatusBar style="light" />
				<H1 sx={{ textAlign: "center" }}>COOKIED</H1>
				<View sx={{ px: 30 }}>
					<View
						sx={{
							alignItems: "center",
							justifyContent: "center",
							width: [null, 600, 700],
						}}
					>
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
						onSubmit={(value: {
							name: string;
							email: string;
							password: string;
							confirmPassword: string;
						}) => {
							register(value.name, value.email, value.password);
						}}
					>
						{({
							handleChange,
							handleBlur,
							handleSubmit,
							values,
							errors,
							isValid,
							touched,
						}) => (
							<>
								<Text variant="label">Name</Text>
								<Th.TextInput
									value={values.name}
									onChangeText={handleChange("name")}
									autoCorrect={false}
									onBlur={handleBlur("name")}
									placeholder="Enter Name"
									textContentType="username"
								/>
								{
									<Text sx={{ color: "error" }}>
										{!!values.name.length && errors.name && touched.name
											? errors.name
											: " "}
									</Text>
								}
								<Text variant="label">Email</Text>
								<Th.TextInput
									value={values.email}
									onChangeText={handleChange("email")}
									autoCorrect={false}
									onBlur={handleBlur("email")}
									placeholder="Enter Email"
									textContentType="emailAddress"
									keyboardType="email-address"
								/>
								{
									<Text sx={{ color: "error" }}>
										{!!values.email.length && errors.email && touched.email
											? errors.email
											: " "}
									</Text>
								}
								<Text variant="label">Password</Text>
								<Th.TextInput
									value={values.password}
									onChangeText={handleChange("password")}
									autoCorrect={false}
									keyboardType="visible-password"
									onBlur={handleBlur("password")}
									placeholder="Enter Password"
									textContentType="password"
								/>
								{
									<Text sx={{ color: "error" }}>
										{!!values.password.length &&
										errors.password &&
										touched.password
											? errors.password
											: " "}
									</Text>
								}
								<Text variant="label">Confirm Password</Text>
								<Th.TextInput
									value={values.confirmPassword}
									onChangeText={handleChange("confirmPassword")}
									autoCorrect={false}
									keyboardType="visible-password"
									onBlur={handleBlur("confirmPassword")}
									placeholder="Confirm Password"
									textContentType="password"
								/>
								{
									<Text sx={{ color: "error" }}>
										{!!values.confirmPassword.length &&
										errors.confirmPassword &&
										touched.confirmPassword
											? errors.confirmPassword
											: " "}
									</Text>
								}
								{isValid ? (
									// @ts-ignore
									<Th.ButtonPrimary onPress={handleSubmit}>
										Sign Up
									</Th.ButtonPrimary>
								) : (
									<Th.ButtonPrimary disabled>Sign Up</Th.ButtonPrimary>
								)}
								<Text sx={{ textAlign: "center", py: "$2" }}>
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
		</View>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({});
