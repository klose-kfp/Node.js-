import React, { useContext } from "react";
import MermaidForm from "@src/function/MermaidForm";
import "./ResponseImage.css";
import { MainContext } from "@src/components/top/Main";

function ResponseImage() {
  const context = useContext(MainContext);
  let EditMermaid = "";
  if (context.FromGPT.MermaidText) {
    EditMermaid = context.FromGPT.MermaidText.replace(/1234567890/g, "\n");
  }
  return (
    <div className="responseimage">
      <MermaidForm src={EditMermaid} />
    </div>
  );
}

export default ResponseImage;
