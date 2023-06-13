// stingify params and log them to console
const logr = (...params: any[]) => {
	"worklet";
	if (__DEV__)
		console.log(...params.map(param => JSON.stringify(param, null, 2)));
};
logr.err = (...params: any[]) => {
	"worklet";
	if (__DEV__)
		console.error(...params.map(param => JSON.stringify(param, null, 2)));
};
logr.warn = (...params: any[]) => {
	"worklet";
	if (__DEV__)
		console.warn(...params.map(param => JSON.stringify(param, null, 2)));
};

export default logr;
