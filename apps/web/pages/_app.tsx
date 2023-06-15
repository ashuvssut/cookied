import "raf/polyfill";
import "setimmediate";

import Head from "next/head";
import React, { useEffect } from "react";
import type { SolitoAppProps } from "solito";
import { ReduxProvider } from "app/store/ReduxProvider";
import { DripsyTheme } from "app/theme";
import { ProtectedRoute } from "app/components/ProtectedRoute";
import LoadingModal from "app/components/LoadingModal";
import { resetReduxPersist_reload } from "app/utils/storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modal } from "app/components/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

function CookiedApp({ Component, pageProps }: SolitoAppProps) {
	useEffect(() => {
		// window["reset"] = resetReduxPersist_reload;
	}, []);
	return (
		<>
			<Head>
				<title>Cookied!!</title>
				<meta
					name="description"
					content="Cookied | Cross-platform Bookmarks manager app"
				/>
				<link
					rel="icon"
					href="https://raw.githubusercontent.com/ashuvssut/cookied/dev/packages/app/assets/svg/good-cookie-square.svg"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta property="og:title" content="Cookied!!" />
				<meta
					property="og:description"
					content="Cookied | Cross-platform Bookmarks manager app"
				/>
				<meta property="og:type" content="website" />
				<meta
					property="og:image"
					content="https://raw.githubusercontent.com/ashuvssut/cookied/dev/packages/app/assets/svg/good-cookie-square.svg"
				/>

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@ashuvssut" />
				<meta name="twitter:creator" content="@ashuvssut" />
				<meta name="twitter:title" content="Cookied!!" />
				<meta
					name="twitter:description"
					content="Cookied | Cross-platform Bookmarks manager app"
				/>
				<meta
					name="twitter:image"
					content="https://raw.githubusercontent.com/ashuvssut/cookied/dev/packages/app/assets/svg/good-cookie-square.svg"
				/>
			</Head>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<DripsyTheme>
					<ReduxProvider>
						<ProtectedRoute>
							<Component {...pageProps} />
							<LoadingModal />
							<Modal />
							<ToastContainer
								position="top-right"
								autoClose={5000}
								hideProgressBar={false}
								newestOnTop={false}
								closeOnClick
								rtl={false}
								pauseOnFocusLoss
								draggable
								pauseOnHover
								theme="colored"
								toastClassName="react-toastify"
							/>
						</ProtectedRoute>
					</ReduxProvider>
				</DripsyTheme>
			</GestureHandlerRootView>
		</>
	);
}

export default CookiedApp;
