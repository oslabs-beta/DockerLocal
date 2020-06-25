import React, { useState } from "react";
import ReactDom from "react-dom";

const modalAppInfo = document.getElementById("modal-appInfo");

const AppInfo: React.FC = () => {
  return ReactDom.createPortal(<div>This is appInfo modal</div>, modalAppInfo);
};

export default AppInfo;
