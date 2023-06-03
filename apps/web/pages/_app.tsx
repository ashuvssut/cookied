import "raf/polyfill";
import "setimmediate";

import { DripsyTheme } from "app/theme";
import Head from "next/head";
import React from "react";
import type { SolitoAppProps } from "solito";

function MyApp({ Component, pageProps }: SolitoAppProps) {
	return (
		<>
			<Head>
				<title>Cookied!!</title>
				<meta name="description" content="Cookied | Bookmarks manager app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<DripsyTheme>
				<Component {...pageProps} />
			</DripsyTheme>
		</>
	);
}

export default MyApp;
