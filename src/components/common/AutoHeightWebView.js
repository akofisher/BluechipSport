import React, { useState } from "react";
import WebView from "react-native-webview";

const DynamicHeightWebView = React.memo((props) => {
  const [height, setHeight] = useState(0);

  const webViewScript = `
    setTimeout(function() {
      const html = document.documentElement;
      const body = document.body;
      const iframe = document.getElementsByTagName("iframe");
      const img = document.getElementsByTagName("img");

      const additionalHeight = iframe?.length * 200;

      window.ReactNativeWebView.postMessage(Math.max(html.clientHeight, html.scrollHeight, body.clientHeight, body.scrollHeight) + additionalHeight);
    }, 500);
    true;
  `;

  return (
    <WebView
      {...props}
      originWhitelist={["*"]}
      style={{
        ...props.style,
        height,
        flex: 0,
      }}
      automaticallyAdjustContentInsets={false}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      onMessage={({ nativeEvent }) => {
        setHeight(parseInt(nativeEvent.data, 10));
      }}
      javaScriptEnabled
      injectedJavaScript={webViewScript}
      domStorageEnabled
      useWebKit
      androidHardwareAccelerationDisabled
    />
  );
});

export default DynamicHeightWebView;
