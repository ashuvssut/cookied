/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig;

const nextConfig = { // for expo client app
	async headers() {
		return [
			{
				source: "/api/:path*", // Replace with your API route path
				headers: [
					{
						key: "Access-Control-Allow-Origin",
						// value: "http://localhost:19000",
            value: "*"
					},
					{
						key: "Access-Control-Allow-Methods",
						value: "GET, POST, PUT, DELETE, OPTIONS",
					},
					{
						key: "Access-Control-Allow-Headers",
						value: "Origin, X-Requested-With, Content-Type, Accept",
					},
				],
			},
		];
	},
};
module.exports = nextConfig;
