const sdk = require("node-appwrite");

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
	const client = new sdk.Client();

	const users = new sdk.Users(client);

	if (
		!req.variables["APPWRITE_FUNCTION_ENDPOINT"] ||
		!req.variables["APPWRITE_FUNCTION_API_KEY"]
	) {
		console.warn("Exec Failed: Environment variables are not set.");
	} else {
		client
			.setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
			.setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
			.setKey(req.variables["APPWRITE_FUNCTION_API_KEY"])
			.setSelfSigned(true);
	}
	try {
		const payload =
			req.payload || throw new Error("Exec Failed: No payload provided");

		const { email, password, name } = payload;
		const user = await users.create(
			ID.unique(),
			email,
			undefined,
			password,
			name,
		);
		res.json({ user, trigger: req.variables.APPWRITE_FUNCTION_TRIGGER });
	} catch (e) {
		console.error(e);
		res.json({ error: e.message });
	}
};
