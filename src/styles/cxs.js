// import cxs in your component module and style it directly as:
// <View style={cxs.px5}></View> <<< will result in a padding horizontal with value of 5
// <View style={cxs.w100}></View> <<< will result in a width with value of 100
// or directly in the component Stylesheet.create({
//    ...cxs.my100, <<< vertical margin 100
//    ...cxs.px10, <<< horizontal padding 10
//    ...cxs.pl20, <<< left padding 20
// })

// You can append shortcuts with proper lower case equivalent in RN
// w: 'width' ...

// To improve performance, 'cxs' now uses 'AppStyles' to cache custom styles
// every property defined in the 'AppStyles' is also available in the 'cxs'
// hence 'cxs' is drop-in replacement of 'AppStyles' and
// there is no need to import 'AppStyles' anymore
// ex:
// >>> AppStyles.shadow is equivalent of cxs.shadow
import { StyleSheet } from "react-native";

import AppStyles from "./styles";

const shortcuts = {
  p: "padding",
  m: "margin",
  l: "left",
  r: "right",
  t: "top",
  b: "bottom",
  x: "horizontal",
  y: "vertical",
  h: "height",
  w: "width",
  f: "fontSize",
};

const cxs = new Proxy(AppStyles, {
  get(target, prop, receiver) {
    if (target.hasOwnProperty(prop)) return target[prop];
    const style = {};
    const match = prop.match(/(^\D+)(\d+)/i);
    if (match) {
      const [, charPart, numPart] = match;
      let styleKey = charPart.split("").reduce((final, currChar) => {
        const keyName = shortcuts[currChar];
        return final + keyName[0].toUpperCase() + keyName.slice(1);
      }, "");
      styleKey = styleKey[0].toLowerCase() + styleKey.slice(1);
      style[styleKey] = +numPart;
      Object.assign(target, StyleSheet.create({ [prop]: style }));
    }
    return target[prop];
  },
});

export default cxs;
