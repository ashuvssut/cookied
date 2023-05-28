import { Button, StyleSheet, View } from "react-native";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "expo-router";

import TButton from "../../components/TButton";
import TInput from "../../components/TInput";
import { Box, TText } from "../../theme";
import ScrollScreen from "../../components/ScrollScreen";
import registerSchema from "../../validators/registerSchema";
import { useAuth } from "../../hooks/useAuth";
import AuthHeader from "../../components/AuthHeader";
import { GoodCookie } from "../../assets/svg";

type Props = {};

const RegisterScreen = (props: Props) => {
	const { register } = useAuth();
	return (
		<ScrollScreen setTopInset={true}>
			<AuthHeader headerName="Sign Up" />
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
						Register with Name , Email and Password
					</TText>
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
								<TText
									marginTop={{phone:"xl",largeScreen:"s"}}
									marginBottom={"s"}
									variant={"label"}
									color={"text"}
								>
									Name
								</TText>
								<TInput
									value={values.name}
									onChangeText={handleChange("name")}
									autoCorrect={false}
									onBlur={handleBlur("name")}
									placeholder="Enter Name"
								/>
								{values.name.length !== 0 && errors.name && touched.name && (
									<TText color={"error"} variant={"body"}>
										{errors.name}
									</TText>
								)}
								<TText
									marginTop={"s"}
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
									marginTop={"s"}
									marginBottom={"s"}
									variant={"label"}
									color={"text"}
								>
									Confirm Password
								</TText>
								<TInput
									value={values.confirmPassword}
									onChangeText={handleChange("confirmPassword")}
									type="password"
									autoCorrect={false}
									onBlur={handleBlur("confirmPassword")}
									placeholder="Confirm Password"
								/>
								{values.confirmPassword.length !== 0 &&
									errors.confirmPassword &&
									touched.confirmPassword && (
										<TText color={"error"} variant={"body"}>
											{errors.confirmPassword}
										</TText>
									)}
								{isValid ? (
									<TButton onPress={handleSubmit} title="REGISTER" />
								) : (
									<TButton disabled title="REGISTER" />
								)}
							</>
						)}
					</Formik>
					<TText
						textAlign={"center"}
						fontWeight={{ phone: "200", largeScreen: "400" }}
						color={"textSecondary"}
						variant={"link"}
					>
						Already have an account ?{" "}
						<Link href="/login">
							<TText
								textAlign={"center"}
								fontWeight={{ phone: "200", largeScreen: "400" }}
								color={"text"}
								variant={"body"}
							>
								Log In
							</TText>
						</Link>
					</TText>
				</Box>
			</Box>
		</ScrollScreen>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({});
