import React from "react";
import "./style.css";

const Newtab = () => {
	return (
		<main>
			<img
				src="https://raw.githubusercontent.com/ashuvssut/cookied/dev/apps/client/assets/svg/good-cookie-square.svg"
				className="App-logo"
				alt="logo"
			/>
			<h1>Cookied!!</h1>
			<code className="himitsu-da">
				Your are looking at the Vercel API Endpoint for Cookied
			</code>
			<h2>
				Cookied is a Bookmarks app that uses AppWrite BaaS, React and React
				Native.
			</h2>
			<p>
				Cookied has a React chrome extension and a React Native Webapp and React
				Native a Android app.
				<br />
				Aaannnd.. it's open source!{" "}
				<a target="_blank" href="https://github.com/ashuvssut/cookied">
					Checkout the repo.
				</a>
			</p>
			<hr />
			<h2 style={{ margin: "2rem auto 0.5rem" }}>Help Wanted!</h2>
			<p>
				AppWrite client Web SDKs did not work on <em>Chrome extension</em> and{" "}
				<em>
					React Native <strong>Web</strong>
				</em>{" "}
				so we had to use Vercel API endpoints to make requests on behalf of the
				client. We are looking for help to fix this AppWrite Web SDKs issue to
				avoid using Vercel API Endpoints. If you are interested, please checkout
				this{" "}
				<a
					target="_blank"
					href="https://github.com/appwrite/appwrite/issues/5576"
				>
					GitHub Issue
				</a>
				.
			</p>
		</main>
	);
};

export default Newtab;
