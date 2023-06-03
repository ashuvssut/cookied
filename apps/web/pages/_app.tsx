import "raf/polyfill";
import "setimmediate";

import Head from "next/head";
import React from "react";
import type { SolitoAppProps } from "solito";
import { Provider } from "react-redux";

import { DripsyTheme } from "app/theme";
import { webStore } from "app/redux/store";

function MyApp({ Component, pageProps }: SolitoAppProps) {
	return (
		<>
			<Head>
				<title>Cookied!!</title>
				<meta name="description" content="Cookied | Bookmarks manager app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Provider store={webStore}>
				<DripsyTheme>
					<Component {...pageProps} />
				</DripsyTheme>
			</Provider>
		</>
	);
}

export default MyApp;
