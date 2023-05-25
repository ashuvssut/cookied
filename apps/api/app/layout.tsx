export const metadata = {
	title: "Cookied!!",
	description: "Cookied Vercel API Endpoint",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
