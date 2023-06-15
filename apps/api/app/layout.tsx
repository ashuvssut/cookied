import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link
					rel="icon"
					href="https://raw.githubusercontent.com/ashuvssut/cookied/dev/packages/app/assets/svg/good-cookie-square.svg"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta property="og:title" content="Cookied!!" />
				<meta property="og:description" content="Cookied Vercel API Endpoint" />
				<meta property="og:type" content="website" />
				<meta
					property="og:image"
					content="https://raw.githubusercontent.com/ashuvssut/cookied/dev/packages/app/assets/svg/good-cookie-square.svg"
				/>
				<title>Cookied!!</title>
			</head>

			<body>{children}</body>
		</html>
	);
}
