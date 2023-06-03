import "raf/polyfill";
import "setimmediate";

import Head from "next/head";
import React from "react";
import type { SolitoAppProps } from "solito";
import { PersistGate } from "redux-persist/integration/react";

import { DripsyTheme } from "app/theme";
import ReduxProvider from "app/redux/store/ReduxProvider";
import storeProvider from "app/redux/store";

const isServer = () => typeof window === `undefined`;
function MyApp({ Component, pageProps }: SolitoAppProps) {
	return (
		<>
			<Head>
				<title>Cookied!!</title>
				<meta name="description" content="Cookied | Bookmarks manager app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
				<ReduxProvider>
					<PersistGate
						loading={null}
						persistor={storeProvider().persistor}
					>
						<DripsyTheme>
							<Component {...pageProps} />
						</DripsyTheme>
					</PersistGate>
				</ReduxProvider>
		</>
	);
}

export default MyApp;
