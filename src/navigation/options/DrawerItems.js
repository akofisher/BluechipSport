import React from "react";
import { useAuth } from "stores";

import SideBar from "../../components/sideBar/sideBar";

const DrawerItems = (props) => {
  return <SideBar {...props} />;
};

export default DrawerItems;
