import React, { useContext } from "react";
import ResponseImage from "./ResponseImage";
import TemprateText from "./TemprateText";
import { MainContext } from "@src/components/top/Main";
import FirstGuidance from "./firstguidance/FirstGuidance";

function FormSlideContents() {
  const context = useContext(MainContext);
  if (context.type.LastPush == "初期") {
    return <FirstGuidance />;
  } else if (context.type.LastPush == "図の種類") {
    return (
      <div className="h-full w-full">
        <TemprateText />
      </div>
    );
  } else if (context.type.LastPush == "Go") {
    return <ResponseImage />;
  }
}

export default FormSlideContents;
