import { Formik, FormikProps } from "formik";
import loginSchema from "../../validators/loginSchema";
import { GoodCookie } from "../../assets/svg";
import { Svg } from "app/components/Svg";
import { Text, View } from "dripsy";
import { StatusBar } from "app/components/StatusBar";
import { Th } from "app/theme/components";
import { TextLink } from "solito/link";
import { usePlatformAuth } from "app/hooks/useAuth";
import { KeyboardUsingScreen } from "app/components/KeyboardUsingScreen";
import { Header } from "app/components/Header";
import Screen from "app/components/Screen";

const LoginScreen = () => {
	const { signIn } = usePlatformAuth();

	return (
		<Screen sx={{ alignItems: "center" }}>
			<KeyboardUsingScreen keyboardShouldPersistTaps="never">
				<StatusBar style="light" />
				<Header />
				<View
					sx={{ px: "$5", flex: 1, maxWidth: 700, width: [null, 600, 700] }}
				>
					<View
						sx={{ alignItems: "center", justifyContent: "center", flex: 0.4 }}
					>
						<Svg
							Svg={GoodCookie}
							webSvgProps={{ style: { height: 200 } }}
							nativeSvgProps={{ height: 200 }}
						/>
					</View>
					<View sx={{ flex: 0.6 }}>
						<Formik
							initialValues={{ email: "", password: "" }}
							validationSchema={loginSchema}
							validateOnMount
							onSubmit={(value: IFormIntitalState) => {
								signIn(value.email, value.password);
							}}
						>
							{p => (
								<>
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
									<View
										sx={{
											flexDirection: "row",
											justifyContent: "space-between",
										}}
									>
										<Text sx={{ color: "error", width: "50%" }}>
											{checkError(p, "password") ? p.errors.password : " "}
										</Text>
										{/* TODO : Implement Forgot Password  */}
										{/* <Text variant="link">Forgot Password ?</Text> */}
									</View>
									<Th.ButtonPrimary // @ts-ignore
										onPress={p.isValid ? p.handleSubmit : () => {}}
										disabled={!p.isValid}
									>
										Log In
									</Th.ButtonPrimary>
									<View
										sx={{
											my: "$3",
											flexDirection: "row",
											justifyContent: "center",
										}}
									>
										<Text sx={{ textAlign: "center", py: "$3" }}>
											Don have an account?{" "}
											<TextLink href="/register">
												<Text variant="link">Sign Up</Text>
											</TextLink>
										</Text>
									</View>
								</>
							)}
						</Formik>
					</View>
				</View>
			</KeyboardUsingScreen>
		</Screen>
	);
};

export default LoginScreen;

interface IFormIntitalState {
	email: string;
	password: string;
}

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
