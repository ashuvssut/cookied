import { Platform, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useTheme } from "@shopify/restyle";

import TScreen from "../../components/TScreen";
import { Box, TText } from "../../theme";
import TInput from "../../components/TInput";
import TButton from "../../components/TButton";
import { useSendIntent } from "../../hooks/useSendIntent";
import { useEffect } from "react";
import { Formik } from "formik";
import loginSchema from "../../validators/loginSchema";
import { useAuth } from "../../hooks/useAuth";

type Props = {};

const LoginScreen = (props: Props) => {
	const theme = useTheme();
	const { signIn } = useAuth();

	const { sharedData, sharedExtraData, sharedMimeType } = useSendIntent();
	useEffect(() => {
		console.log("sharedData", sharedData);
		console.log("sharedExtraData", sharedExtraData);
		console.log("sharedMimeType", sharedMimeType);
	}, [sharedData, sharedExtraData, sharedMimeType]);

	return (
		<TScreen setTopInset={true}>
			<Box
				flex={1}
				backgroundColor={"surface"}
				justifyContent={"center"}
				alignItems={"center"}
				position={"relative"}
			>
				<Box
					backgroundColor={{ phone: "background" }}
					justifyContent={"center"}
					alignItems={"center"}
					width={{ phone: "80%", largeScreen: "30%" }}
					height={{ phone: "60%", largeScreen: "60%" }}
					borderRadius={20}
					elevation={30}
					shadowColor={"surface"}
				>
					<TText marginBottom={"s"} variant={"header"} color={"text"}>
						LOGIN
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
								{isValid ? (
									<TButton onPress={handleSubmit} title="LOGIN" />
								) : (
									<TButton disabled title="LOGIN" />
								)}
							</>
						)}
					</Formik>
					<TText variant={"body"} color={"text"}>
						OR
					</TText>
					<TButton
						height={50}
						href="/register"
						onPress={() => console.log("hello")}
						title="REGISTER"
					/>
				</Box>
			</Box>
		</TScreen>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({});
