import { MainContext } from "@src/components/top/Main";
import React, { useContext } from "react";
import TemprateText from "../TemprateText";

function FirstGuidance() {
  const context = useContext(MainContext);

  if (
    context.type.SelectType == "シーケンス図" ||
    context.type.HoverType == "シーケンス図"
  ) {
    return (
      <div className="h-full w-full">
        <TemprateText />
      </div>
    );
  } else if (
    context.type.SelectType == "aaa" ||
    context.type.HoverType == "aaa"
  ) {
    return <div className="h-full">aaa</div>;
  } else {
    return <div className="h-full"></div>;
  }
}
export default FirstGuidance;
