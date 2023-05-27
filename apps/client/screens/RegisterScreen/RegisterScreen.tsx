import { Button, StyleSheet, View } from "react-native";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

import TButton from "../../components/TButton";
import TInput from "../../components/TInput";
import { Box, TText } from "../../theme";
import ScrollScreen from "../../components/ScrollScreen";
import registerSchema from "../../validators/registerSchema";
import { useAuth } from "../../hooks/useAuth";
import AuthHeader from "../../components/AuthHeader";

type Props = {};

const RegisterScreen = (props: Props) => {
	const { register } = useAuth();
	return (
		<ScrollScreen setTopInset={true}>
			<AuthHeader headerName="Sign Up"/>
			<Box
				flex={1}
				backgroundColor={"background"}
				justifyContent={"center"}
				alignItems={"center"}
				position={"relative"}
			>
				<Box
					backgroundColor={{ phone: "background" }}
					justifyContent={"center"}
					alignItems={"center"}
					width={{ phone: "80%", largeScreen: "30%" }}
					height={{ phone: "70%", largeScreen: "60%" }}
					borderRadius={20}
					elevation={30}
					shadowColor={"surface"}
				>
					<TText marginBottom={"s"} variant={"header"} color={"text"}>
						REGISTER
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
					<TText variant={"body"} color={"text"}>
						OR
					</TText>
					<TButton
						href="/login"
						onPress={() => console.log("hello")}
						title="LOGIN"
					/>
				</Box>
			</Box>
		</ScrollScreen>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({});
