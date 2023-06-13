import React from 'react'
import './style.css'
import Image from 'next/image';

const Newtab = () => {
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
				Aaannnd.. it&apos;s open source!{" "}
				<a target="_blank" href="https://github.com/ashuvssut/cookied">
					Checkout the repo.
				</a>
			</p>
			<hr />
		</main>
	);
}

export default Newtab
