import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect } from "expo-router";

import { useAuth } from "../../hooks/useAuth";
import { createEmailVerification } from "../../apis/appwriteAuthApi";

type Props = {};

const EmailVerificationscreen = (props: Props) => {
	const { isVerified } = useAuth();

	const createEmailVerificationCallback = useCallback(async () => {
		if (!isVerified) {
			const token = await createEmailVerification();
			console.log(token);
		}
	}, []);

	useFocusEffect(() => {
		createEmailVerificationCallback();
	});

	return (
		<View>
			<Text>EmailVerificationscreen</Text>
		</View>
	);
};

export default EmailVerificationscreen;

const styles = StyleSheet.create({});
