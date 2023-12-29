import React from "react";
import mermaid from "mermaid";
import { useEffect, useRef } from "react";

import "./Mermaid.css";

type Props = {
  EditMermaid: string;
};

function MermaidSVG({ EditMermaid }: Props) {
  useEffect(() => {
    if (EditMermaid) {
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
    }
  }, [EditMermaid]);
  console.log(EditMermaid);

  return EditMermaid ? (
    <div>
      <div className="mermaids" id="svg" key={EditMermaid}>
        {EditMermaid}
      </div>
    </div>
  ) : (
    <div className="mermaids" id="svg" key={EditMermaid} />
  );
}

export default MermaidSVG;
