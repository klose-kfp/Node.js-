import "./ClickedContents.css";
import { GPT } from "@src/components/top/Main";
import MermaidSVG from "@src/function/MermaidSVG";
import React from "react";

type SvgImageProps = {
  clickedGPT: GPT;
};

function ClickedContents({ clickedGPT }: SvgImageProps) {
  let EditMermaid = "";
  if (clickedGPT.Mermaid) {
    EditMermaid = clickedGPT.Mermaid.replace(/1234567890/g, "\n");
    return (
      <div className="clickedcontents h-full pr-4">
        <div className="flex">
          <div className="font-zenKurenaido font-semibold mr-4">title:</div>
          <div className="font-zenKurenaido font-semibold">
            {clickedGPT.Title}
          </div>
        </div>
        <MermaidSVG EditMermaid={EditMermaid} />
        <div>
          <div className="font-zenKurenaido pt-4">日本語テキスト:</div>
          <div className="pb-4 whitespace-pre-line">{clickedGPT.text}</div>
        </div>
        <div>
          <div>
            <div className="font-zenKurenaido"> マーメイド構文:</div>
            <div className="pb-4 whitespace-pre-line">{clickedGPT.Mermaid}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="clickedcontents font-zenKurenaido font-semibold h-full w-full justify-center text-3xl flex align-items-center pb-40">
        Image Click!!
      </div>
    );
  }
}

export default ClickedContents;
