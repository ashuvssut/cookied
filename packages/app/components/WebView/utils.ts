export const extractHostname = (url: string) => {
	let hostname;

	if (url.indexOf("//") > -1) {
		hostname = url.split("/")[2];
	} else {
		hostname = url.split("/")[0];
	}

	hostname = hostname.split(":")[0];
	hostname = hostname.split("?")[0];

	return hostname;
};

export const documentHeightCallbackScript = `
  function onElementHeightChange(elm, callback) {
    var lastHeight;
    var newHeight;
    (function run() {
      newHeight = Math.max(elm.clientHeight, elm.scrollHeight);
      if (lastHeight != newHeight) {
        callback(newHeight);
      }
      lastHeight = newHeight;
      if (elm.onElementHeightChangeTimer) {
        clearTimeout(elm.onElementHeightChangeTimer);
      }
      elm.onElementHeightChangeTimer = setTimeout(run, 200);
    })();
  }
  onElementHeightChange(document.body, function (height) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        event: 'documentHeight',
        documentHeight: height,
      }),
    );
  });
`;
