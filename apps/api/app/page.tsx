import React from "react";
import "./style.css";
import Image from "next/image";

const App = () => {
	return (
		<main>
			<Image
				src="https://raw.githubusercontent.com/ashuvssut/cookied/dev/packages/app/assets/svg/good-cookie-square.svg"
				className="App-logo"
				alt="logo"
				width={400}
				height={400}
			/>
			<h1>Cookied!!</h1>
			<code className="himitsu-dayo">
				Your are looking at the Vercel API Endpoint for Cookied
			</code>
			<h2>
				Cookied is a Bookmarks app that uses Convex BaaS, React and React
				Native.
			</h2>
			<p>
				Cookied has a React&nbsp;
				<a target="_blank" href={process.env.NEXT_PUBLIC_CHROME_EXT}>
					Chrome extension
				</a>
				&nbsp;and a React Native&nbsp;
				<a target="_blank" href={process.env.NEXT_PUBLIC_WEB_URL}>
					Web app
				</a>
				<br />
				&nbsp;and React Native Android app (
				<a target="_blank" href={process.env.NEXT_PUBLIC_ANDROID_QR}>
					Scan to install the app
				</a>
				&nbsp;or&nbsp;
				<a target="_blank" href={process.env.NEXT_PUBLIC_ANDROID_QR}>
					download the APK
				</a>
				)
				<br />
				<br />
				Aaannnd.. it&apos;s open source!&nbsp;
				<a target="_blank" href={process.env.NEXT_PUBLIC_PROJ_REPO}>
					Checkout the repo.
				</a>
			</p>
			<hr />
		</main>
	);
};

export default App;
