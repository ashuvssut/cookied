import { FormTextField } from "app/components/Formik/FormFields/BasicFields";
import { FC, useEffect, useState } from "react";
import { FormikProps } from "formik";
import { TBookmarkFormSchema } from "app/components/Formik/bookmarkFormSchema";
import { ActivityIndicator, View, useDripsyTheme } from "dripsy";
import { isUrlValid } from "app/utils/misc";
import { IconButton } from "app/components/IconButton";
import { MdRefresh } from "app/assets/icons";
import { debounce } from "lodash";
import { useAction } from "convex/react";
import { api } from "gconvex/_generated/api";
import { Toast } from "app/components/Toast";

interface IBmTitleFetchingField {
	formikProps: FormikProps<TBookmarkFormSchema>;
}

export const BmTitleFetchingField: FC<IBmTitleFetchingField> = ({
	formikProps: p,
}) => {
	const [displayTitleRefetcher, setDisplayTitleRefetcher] = useState(false);
	useEffect(() => {
		async function setFetchBtnVisibility() {
			const isValid = await isUrlValid(p.values.url);
			const displayTitle = !!p.values.url && isValid;
			setDisplayTitleRefetcher(displayTitle);
		}
		setFetchBtnVisibility();
	}, [p.values.url]);

	const [isLoading, setIsLoading] = useState(false);
	const getTitleFromUrl = useAction(api.webContent.getTitleFromUrl);
	async function setTitle() {
		if (!(await isUrlValid(p.values.url))) return;
		setIsLoading(true);
		try {
			const fetchedTitle = (await getTitleFromUrl({ url: p.values.url })) || "";
			p.setFieldValue("title", fetchedTitle.trim());
		} catch (err: any) {
			const errMsg = err.message || err.toString();
			console.error("Error:", errMsg);
			Toast.error(errMsg);
		}
		setIsLoading(false);
	}
	useEffect(() => {
		const debouncedSetTitle = debounce(() => {
			if (!p.values.title) setTitle();
		}, 1000);
		debouncedSetTitle();
		return () => void debouncedSetTitle.cancel();
	}, [p.values.url]);

	const onPrimary = useDripsyTheme().theme.colors.onPrimary;
	return (
		<FormTextField
			name="title"
			formikProps={p}
			fieldProps={{
				placeholder: "Enter the Bookmark name",
				sx: { pr: 40, width: "100%", color: onPrimary },
			}}
			endCompo={
				<View sx={{ position: "absolute", right: 5, bg: "surface" }}>
					<IconButton
						onPress={setTitle}
						sx={{ display: displayTitleRefetcher ? "flex" : "none" }}
						disabled={isLoading}
					>
						{isLoading ? (
							<ActivityIndicator />
						) : (
							<MdRefresh color={onPrimary} size={20} />
						)}
					</IconButton>
				</View>
			}
		/>
	);
};
