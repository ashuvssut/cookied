import React from "react";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Formik } from "formik";

import loginSchema from "../../validators/loginSchema";
import { useAuth } from "../../hooks/useRestAuth";
import AuthHeader from "../../components/AuthHeader";
import { GoodCookie } from "../../assets/svg";
import ScrollScreen from "../../components/ScrollScreen";
import { Svg } from "app/components/Svg";
import { useDripsyTheme } from "dripsy";

type Props = {};

const LoginScreen = (props: Props) => {
	const theme = useDripsyTheme();
	const { signIn } = useAuth();
	console.log(GoodCookie);
	return (
		// <ScrollScreen setTopInset={true}>
		<>
			<AuthHeader headerName="Log In" />
		</>
		// <View
		// 	sx={{ height: [180, null, 150], alignItems: "center", width: "100%" }}
		// >
		// 	<Svg Svg={GoodCookie} nativeSvgProps={{ height: "100%" }} />
		// </View>
		/* <Text
				marginTop={"l"}
				textAlign={"center"}
				variant={"header"}
				color={"text"}
			>
				COOKIED
			</Text>
			<Box
				flex={1}
				backgroundColor={"background"}
				paddingHorizontal={"m"}
				// flexDirection={{ largeScreen: "row" }}
				position={"relative"}
			>
				<Box alignItems={{ largeScreen: "center" }} flex={1}>
					<TText
						marginTop={"l"}
						marginBottom={"s"}
						variant={"subHeader"}
						color={"textSecondary"}
					>
						Login with Email and Password
					</TText>
					<Formik
						initialValues={{
							email: "",
							password: "",
						}}
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
								<TText
									marginTop={"xl"}
									marginBottom={"s"}
									variant={"label"}
									color={"text"}
								>
									Email
								</TText>
								<TInput
									value={values.email}
									onChangeText={handleChange("email")}
									autoCorrect={false}
									onBlur={handleBlur("email")}
									placeholder="Enter Email"
								/>
								{values.email.length !== 0 && errors.email && touched.email && (
									<TText color={"error"} variant={"body"}>
										{errors.email}
									</TText>
								)}
								<TText
									marginTop={"s"}
									marginBottom={"s"}
									variant={"label"}
									color={"text"}
								>
									Password
								</TText>
								<TInput
									value={values.password}
									onChangeText={handleChange("password")}
									autoCorrect={false}
									type="password"
									onBlur={handleBlur("password")}
									placeholder="Enter Password"
								/>
								{values.password.length !== 0 &&
									errors.password &&
									touched.password && (
										<TText color={"error"} variant={"body"}>
											{errors.password}
										</TText>
									)}
								<TText
									textDecorationLine={"underline"}
									color={"textSecondary"}
									variant={"link"}
								>
									Forgot Password ?
								</TText>
								{isValid ? (
									<TButton onPress={handleSubmit} title="Log In" />
								) : (
									<TButton disabled title="Log In" />
								)}
								<TText
									textAlign={"center"}
									fontWeight={{ phone: "200", largeScreen: "400" }}
									color={"textSecondary"}
									variant={"link"}
								>
									Don't have an account ?{" "}
									<Link href="/register">
										<TText
											textAlign={"center"}
											fontWeight={{ phone: "200", largeScreen: "400" }}
											color={"text"}
											variant={"body"}
										>
											Sign Up
										</TText>
									</Link>
								</TText>
							</>
						)}
					</Formik>
				</Box>
			</Box> */
		// </ScrollScreen>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({});
