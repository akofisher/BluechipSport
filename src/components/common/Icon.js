import { SvgICONS } from "assets/svgs/svgIcons";
import React, { memo } from "react";

const Icon = memo((props) => {
  const { iconName, style } = props;
  const SvgIcon = SvgICONS[iconName];
  return SvgIcon ? <SvgIcon style={style} /> : null;
});

export default Icon;
