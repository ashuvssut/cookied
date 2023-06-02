import { loadWebFonts } from "app/theme/fonts.web";
import { FCC } from "app/types/IReact";

const TypographyLoader: FCC = ({ children }) => {
	loadWebFonts();
	return <>{children}</>;
};

export default TypographyLoader;

// const regularWghtStr = [400, 500, 600].map(wght => `0,${wght};`).join("");
// const italicWghtStr = [400].map(wght => `1,${wght};`).join("");
// const fontStr = `${regularWghtStr}${italicWghtStr}`.slice(0, -1);
// const fontsLink = `https://fonts.googleapis.com/css2?family=Poppins:ital,wght@${fontStr}&display=swap`;

/*  
import Head from "next/head";
<Head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossOrigin="anonymous"
	/>
	<link href={fontsLink} rel="stylesheet" />
</Head>; 
*/
