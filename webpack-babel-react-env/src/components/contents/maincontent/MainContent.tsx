import React from "react";
import { MainContext } from "@src/components/top/Main";
import { useContext } from "react";
import "./MainContent.css";

function MainContent() {
  const context = useContext(MainContext);
  if (context.type.DisplayType == "form") {
    return <div className="maincontent">{context.slide}</div>;
  } else if (context.type.DisplayType == "past") {
    return <div className="h-full">{context.slide}</div>;
  }
  // if (context.type.DisplayType == "form") {
  //   return <FormSlide />;
  // } else if (context.type.DisplayType == "past") {
  //   return <PostContents />;
  // }
}

export default MainContent;
