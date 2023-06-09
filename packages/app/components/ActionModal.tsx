import { StyleSheet } from "react-native";
import { Text, View } from "dripsy";
import React from "react";
import { Formik } from "formik";
import { Th } from "app/theme/components";
import loginSchema from "app/validators/loginSchema";
import { TextLink } from "solito/link";
import { TModal } from "app/screens/HomeScreen/HomeScreen.native";

type Props = {
	title: string;
	type: TModal;
	onClose: () => void;
};

const ActionModal = (props: Props) => {
	const handleSubmit = value => {
		if (props.type === "add-bookmark") {
		}
		if (props.type === "edit-bookmark") {
		}
		if (props.type === "add-folder") {
		}
		if (props.type === "edit-folder") {
		}
	};
	return (
		<View sx={{ marginHorizontal: "$4", marginVertical: "$4" }}>
			<Formik
				initialValues={{ title: "", url: "" }}
				// validationSchema={loginSchema}
				// validateOnMount
				onSubmit={value => handleSubmit(value)}
			>
				{p => (
					<>
						<Th.TextInput
							value={p.values.title}
							onChangeText={p.handleChange("title")}
							autoCorrect={false}
							onBlur={p.handleBlur("title")}
							placeholder="Enter the title"
						/>
						<View sx={{ marginTop: "$4" }} />
						{(props.type === "add-bookmark" ||
							props.type === "edit-bookmark") && (
							<Th.TextInput
								value={p.values.url}
								onChangeText={p.handleChange("url")}
								autoCorrect={false}
								onBlur={p.handleBlur("url")}
								placeholder="Enter Url"
							/>
						)}
						<View
							sx={{
								flexDirection: "row",
								flex: 1,
								justifyContent: "space-evenly",
							}}
						>
							<Th.ButtonSecondary
								onPress={() => props.onClose()}
								sx={{ flex: 1, marginRight: "$3" }}
							>
								Cancel
							</Th.ButtonSecondary>
							<Th.ButtonPrimary sx={{ flex: 1, marginLeft: "$3" }}>
								Add
							</Th.ButtonPrimary>
						</View>
					</>
				)}
			</Formik>
		</View>
	);
};

export default ActionModal;

const styles = StyleSheet.create({});
