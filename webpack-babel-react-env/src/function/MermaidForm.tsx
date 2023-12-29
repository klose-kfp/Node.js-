import React, { useContext } from "react";
import mermaid from "mermaid";
import { useEffect, useRef } from "react";

import "./Mermaid.css";
import { MainContext } from "@src/components/top/Main";

type Props = {
  src: string;
};

function MermaidForm({ src }: Props) {
  const context = useContext(MainContext);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (src) {
      const doc: any = document.getElementById("svg");
      mermaid.initialize({
        theme: "base",
        themeVariables: {
          primaryColor: "#6A7FAB",
          primaryTextColor: "#FAFBF9",
          primaryBorderColor: "#6A7FAB",
          lineColor: "#6A7FABCC",
          textColor: "#6A7FABCC",
          fontSize: "100px",
        },
      });
      mermaid.run({
        nodes: [doc],
      });

      setTimeout(() => {
        convertSVG();
      }, 1000);
    }
  }, [src]);
  console.log(src);

  const convertSVG = () => {
    if (src) {
      let svg_element: SVGSVGElement | null | undefined =
        svgContainerRef.current?.querySelector("svg");
      console.log(svg_element);
      if (svg_element) {
        context.svgSaveToState(svg_element);
        const viewBox = svg_element.getAttribute("viewBox");
        const idString = svg_element.getAttribute("id");
        const svgStartTag =
          '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="' +
          viewBox +
          '" id="' +
          idString +
          '">';
        const svgContent = svg_element.innerHTML;
        const svgString = svgStartTag + svgContent + "</svg>";
        console.log(svgString);

        const base64String = btoa(encodeURIComponent(svgString));
        context.SVGProps(base64String);
        console.log(base64String);
      }
    }
  };

  return src ? (
    <div className="mermaid-form">
      <div className="mermaids" id="svg" ref={svgContainerRef} key={src}>
        {src}
      </div>
    </div>
  ) : (
    <div className="mermaids" id="svg" key={src} />
  );
}

export default MermaidForm;
