import React, { useContext, useState } from "react";
import "./TemprateText.css";

import MermaidTemp from "@src/function/MermaidTemp";
import { Button } from "@mui/material";
import { MainContext } from "@src/components/top/Main";

type TemprateTextState = "image" | "text";

function TemprateText() {
  const context = useContext(MainContext);
  const [state, setState] = useState<TemprateTextState>("text");

  const text =
    "1.AからB :リクエスト" +
    "\n" +
    "2.BからC :リクエスト" +
    "\n" +
    "3リクエスト不成立の場合" +
    "\n" +
    "3.1 CからB :400エラー" +
    "\n" +
    "3.2 BからA :400エラー" +
    "\n" +
    "4.CからA :レスポンス";
  function imageClick() {
    setState("image");
  }
  function textClick() {
    setState("text");
  }

  return (
    <div className="temprate-contents">
      <div className="temprate-nav">
        <Button
          disabled={state == "image"}
          className="temp-btn btns"
          variant="contained"
          sx={{
            height: "80%",
            color: "black",
            backgroundColor: "rgba(0, 0, 0, 0.12)",
            ":hover": {
              backgroundColor: "aqua",
              color: "black",
            },
            ":disabled": {
              backgroundColor: "#1976d2",
              color: "white",
            },
          }}
          onClick={imageClick}
        >
          図
        </Button>
        <Button
          disabled={state == "text"}
          className="temp-btn btns"
          variant="contained"
          sx={{
            height: "80%",
            marginLeft: "2%",
            color: "black",
            backgroundColor: "rgba(0, 0, 0, 0.12)",
            ":hover": {
              backgroundColor: "aqua",
              color: "black",
            },
            ":disabled": {
              backgroundColor: "#1976d2",
              color: "white",
            },
          }}
          onClick={textClick}
        >
          テキスト
        </Button>
      </div>

      <div className="temprate">
        <h1 className="temprate-title font-zenKurenaido underline decoration-dotted underline-offset-8">
          Template
        </h1>
        {state == "image" ? (
          <div className="temprate-temp">
            <MermaidTemp />
            <div className="font-zenKurenaido pb-1 pt-1 pl-36">
              日本語テキスト:
            </div>
            <div className="temprate-text pl-44 whitespace-pre-line">
              {text}
            </div>
          </div>
        ) : (
          <div className="temprate-temp">
            <div className="font-zenKurenaido pb-1 pt-1 pl-36">
              日本語テキスト:
            </div>
            <div className="temprate-text pl-44 whitespace-pre-line">
              {text}{" "}
            </div>
            <MermaidTemp />
          </div>
        )}
      </div>
    </div>
  );
}

export default TemprateText;
