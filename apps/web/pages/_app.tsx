import "raf/polyfill";
import "setimmediate";

import Head from "next/head";
import React from "react";
import type { SolitoAppProps } from "solito";
import { ReduxProvider } from "app/store/ReduxProvider";
import { DripsyTheme } from "app/theme";
import { ProtectedRoute } from "app/components/ProtectedRoute";

function CookiedApp({ Component, pageProps }: SolitoAppProps) {
	return (
		<>
			<Head>
				<title>Cookied!!</title>
				<meta name="description" content="Cookied | Bookmarks manager app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<DripsyTheme>
				<ReduxProvider>
					<ProtectedRoute>
						<Component {...pageProps} />
					</ProtectedRoute>
				</ReduxProvider>
			</DripsyTheme>
		</>
	);
}

export default CookiedApp;
