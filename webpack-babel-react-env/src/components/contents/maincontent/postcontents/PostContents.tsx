import React, { useContext, useState } from "react";
import "./../Post.css";

import Split from "react-split";
import SVGPost from "./PostSvgContents/PostList";
import { GPT, MainContext } from "@src/components/top/Main";
import ClickedContents from "./PostSvgContents/ClickedContents";

function PostContents() {
  const context = useContext(MainContext);
  const [state, setState] = useState<GPT>({
    loginUser: "",
    Title: "",
    Mermaid: "",
    svg: "",
    text: "",
    UpdatedDate: "",
  });
  function clickPost(clickedIndex: number) {
    setState(context.GPTs[clickedIndex]);
  }
  console.log(context.GPTs);
  return (
    <Split
      className="flex formslide slide"
      gutter={() => {
        const gutterElement = document.createElement("div");
        gutterElement.className = `gutter1 `;
        return gutterElement;
      }}
      gutterStyle={() => ({})}
      sizes={[40, 60]}
    >
      <div className="posttext-post">
        {context.GPTs.map((GPT: any, index: number) => (
          <SVGPost
            index={index}
            SVG_base64={GPT.svg}
            SVG_Title={GPT.Title}
            SVG_Update={GPT.UpdatedDate}
            clickPost={(clickedIndex: number) => clickPost(clickedIndex)}
          />
        ))}
      </div>
      <div>
        <ClickedContents clickedGPT={state} />
      </div>
    </Split>
  );
}

export default PostContents;
