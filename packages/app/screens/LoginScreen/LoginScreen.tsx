import React from "react";
import { Formik } from "formik";
import loginSchema from "../../validators/loginSchema";
import { GoodCookie } from "../../assets/svg";
import { Svg } from "app/components/Svg";
import { H1, Text, View } from "dripsy";
import { StatusBar } from "app/components/StatusBar";
import { useSafeArea } from "app/components/SafeArea/useSafeArea";
import { Th } from "app/theme/components";
import { TextLink } from "solito/link";
import { usePlatformAuth } from "app/hooks/usePlatformAuth";
import { KeyboardUsingScreen } from "app/components/KeyboardUsingScreen";

type Props = {};

const LoginScreen = (props: Props) => {
	const { signIn } = usePlatformAuth();
	const inset = useSafeArea();
	return (
		<View
			sx={{
				bg: "primary",
				pt: inset.top,
				height: "100%",
				alignItems: "center",
			}}
		>
			<KeyboardUsingScreen keyboardShouldPersistTaps="never">
				<StatusBar style="light" />
				<H1 sx={{ textAlign: "center" }}>COOKIED</H1>
				<View
					sx={{ px: "$4", flex: 1, maxWidth: 700, width: [null, 600, 700] }}
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
							onSubmit={(value: { email: string; password: string }) => {
								signIn(value.email, value.password);
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
									<View
										sx={{
											flexDirection: "row",
											justifyContent: "space-between",
										}}
									>
										<Text sx={{ color: "error", width: "50%" }}>
											{!!values.password.length &&
											errors.password &&
											touched.password
												? errors.password
												: " "}
										</Text>

										<Text variant="link">Forgot Password ?</Text>
									</View>
									{isValid ? (
										// @ts-ignore
										<Th.ButtonPrimary onPress={handleSubmit}>
											Log In
										</Th.ButtonPrimary>
									) : (
										<Th.ButtonPrimary disabled>Log in</Th.ButtonPrimary>
									)}
									<View
										sx={{
											my: "$2",
											flexDirection: "row",
											justifyContent: "center",
										}}
									>
										<Text sx={{ textAlign: "center", py: "$2" }}>
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
		</View>
	);
};

export default LoginScreen;
