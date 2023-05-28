import { Platform, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useTheme } from "@shopify/restyle";
import { useSendIntent } from "../../hooks/useSendIntent";
import { useEffect } from "react";
import { Formik } from "formik";

import TScreen from "../../components/TScreen";
import { Box, TText } from "../../theme";
import TInput from "../../components/TInput";
import TButton from "../../components/TButton";
import loginSchema from "../../validators/loginSchema";
import { useAuth } from "../../hooks/useAuth";
import AuthHeader from "../../components/AuthHeader";
import { GoodCookie } from "../../assets/svg";

type Props = {};

const LoginScreen = (props: Props) => {
	const theme = useTheme();
	const { signIn } = useAuth();

	return (
		<TScreen setTopInset={true}>
			<AuthHeader headerName="Log In" />
			<Box
				height={{ phone: 180, largeScreen: 150 }}
				alignItems={"center"}
				width={"100%"}
			>
				<GoodCookie height={"100%"} />
			</Box>
			<TText marginTop={"l"} textAlign={"center"} variant={"header"} color={"text"}>
				COOKIED
			</TText>
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
			</Box>
		</TScreen>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({});
