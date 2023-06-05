const logr = (...params: any[]) => {
	params.forEach(param => {
		console.log(JSON.stringify(param, null, 2));
	});
};
logr.err = (...params: any[]) => {
	params.forEach(param => {
		console.error(JSON.stringify(param, null, 2));
	});
};

export default logr;
