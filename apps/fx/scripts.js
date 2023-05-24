import { execSync } from "child_process";
import fs from "fs";

function editPackageJsons() {
	const packageJsons = execSync("find functions -name package.json");

	const packageJsonsArray = packageJsons.toString().split("\n");

	packageJsonsArray.forEach(packageJsonPath => {
		if (!packageJsonPath) return;
		const pwd = packageJsonPath.split("/")[1];
		const kebabCasePwd = convertToKebabCase(pwd);
		
		const packageJson = fs.readFileSync(packageJsonPath, "utf8");

		const newPackageJson = packageJson.replace(
			/\"name\": \"[^\"]*\"/g,
			`"name": "${kebabCasePwd}"`,
		);

		fs.writeFileSync(packageJsonPath, newPackageJson);

		console.log(`Updated ${packageJsonPath}`);
	});
}

function convertToKebabCase(str) {
	const string = str.trim();
	// insert a space in camelCase text such as "camelCase" to "camel Case"
	const insertSpace = string.replace(/([a-z])([A-Z])/g, "$1 $2");
	const lowerCase = insertSpace.toLowerCase();
	return lowerCase.replace(/(\s|_)+/g, "-");
}

editPackageJsons();
