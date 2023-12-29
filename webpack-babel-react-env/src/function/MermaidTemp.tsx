import React from "react";
import mermaid from "mermaid";
import { useEffect, useRef } from "react";

import "./Mermaid.css";

type Props = {};

function MermaidTemp({}: Props) {
  const svgRef = useRef<HTMLInputElement>(null);
  const src =
    "sequenceDiagram" +
    "\n" +
    "participant A" +
    "\n" +
    "participant B" +
    "\n" +
    "participant C" +
    "\n" +
    "A->>B: リクエスト" +
    "\n" +
    "B->>C: リクエスト" +
    "\n" +
    "alt リクエストが不成立の場合" +
    "\n" +
    "C-->>B: 400エラー" +
    "\n" +
    "B-->>A: 400エラー" +
    "\n" +
    "else" +
    "\n" +
    "C-->>A: レスポンス" +
    "\n" +
    "end";

  useEffect(() => {
    if (src) {
      const doc: any = document.getElementById("temp");
      mermaid.initialize({
        theme: "base",
        themeVariables: {
          primaryColor: "#6A7FAB",
          primaryTextColor: "#FAFBF9",
          primaryBorderColor: "#6A7FAB",
          lineColor: "#6A7FABCC",
          textColor: "#6A7FABCC",
          fontSize: "100px",
          // maxWidth: "2000px!important",
        },
      });
      mermaid.run({
        nodes: [doc],
      });
    }
    // let svg_element: any = svgRef.current?.querySelector("svg");
    // console.log(svg_element);

    // if (!svgRef.current) return;
    // let svg = svgRef.current.value;
    // console.log(svg);
  }, [src]);
  return (
    <div className="mermaids-temp" id="temp" key={src} ref={svgRef}>
      {src}
      {/* <svg id="mermaid-1701869774335" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style>#mermaid-1701869774335{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:100px;fill:#6A7FABCC;}#mermaid-1701869774335 .error-icon{fill:hsl(40.6153846154, 27.8969957082%, 59.3137254902%);}#mermaid-1701869774335 .error-text{fill:rgb(74.8068669527, 93.5085836909, 132.6931330472);stroke:rgb(74.8068669527, 93.5085836909, 132.6931330472);}#mermaid-1701869774335 .edge-thickness-normal{stroke-width:2px;}#mermaid-1701869774335 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-1701869774335 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-1701869774335 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-1701869774335 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-1701869774335 .marker{fill:#6A7FABCC;stroke:#6A7FABCC;}#mermaid-1701869774335 .marker.cross{stroke:#6A7FABCC;}#mermaid-1701869774335 svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:100px;}#mermaid-1701869774335 .actor{stroke:#6A7FAB;fill:#6A7FAB;}#mermaid-1701869774335 text.actor>tspan{fill:#FAFBF9;stroke:none;}#mermaid-1701869774335 .actor-line{stroke:grey;}#mermaid-1701869774335 .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:#6A7FABCC;}#mermaid-1701869774335 .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:#6A7FABCC;}#mermaid-1701869774335 #arrowhead path{fill:#6A7FABCC;stroke:#6A7FABCC;}#mermaid-1701869774335 .sequenceNumber{fill:rgba(149, 128, 84, 0.8);}#mermaid-1701869774335 #sequencenumber{fill:#6A7FABCC;}#mermaid-1701869774335 #crosshead path{fill:#6A7FABCC;stroke:#6A7FABCC;}#mermaid-1701869774335 .messageText{fill:#6A7FABCC;stroke:none;}#mermaid-1701869774335 .labelBox{stroke:#6A7FAB;fill:#6A7FAB;}#mermaid-1701869774335 .labelText,#mermaid-1701869774335 .labelText>tspan{fill:#FAFBF9;stroke:none;}#mermaid-1701869774335 .loopText,#mermaid-1701869774335 .loopText>tspan{fill:#FAFBF9;stroke:none;}#mermaid-1701869774335 .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#6A7FAB;fill:#6A7FAB;}#mermaid-1701869774335 .note{stroke:hsl(52.6829268293, 60%, 73.9215686275%);fill:#fff5ad;}#mermaid-1701869774335 .noteText,#mermaid-1701869774335 .noteText>tspan{fill:#333;stroke:none;}#mermaid-1701869774335 .activation0{fill:hsl(100.6153846154, 27.8969957082%, 54.3137254902%);stroke:hsl(100.6153846154, 27.8969957082%, 44.3137254902%);}#mermaid-1701869774335 .activation1{fill:hsl(100.6153846154, 27.8969957082%, 54.3137254902%);stroke:hsl(100.6153846154, 27.8969957082%, 44.3137254902%);}#mermaid-1701869774335 .activation2{fill:hsl(100.6153846154, 27.8969957082%, 54.3137254902%);stroke:hsl(100.6153846154, 27.8969957082%, 44.3137254902%);}#mermaid-1701869774335 .actorPopupMenu{position:absolute;}#mermaid-1701869774335 .actorPopupMenuPanel{position:absolute;fill:#6A7FAB;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-1701869774335 .actor-man line{stroke:#6A7FAB;fill:#6A7FAB;}#mermaid-1701869774335 .actor-man circle,#mermaid-1701869774335 line{stroke:#6A7FAB;fill:#6A7FAB;stroke-width:2px;}#mermaid-1701869774335 :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g></g></svg> */}
    </div>
  );
}

export default MermaidTemp;
