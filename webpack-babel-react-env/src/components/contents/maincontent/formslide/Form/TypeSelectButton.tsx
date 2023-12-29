import { Fab } from "@mui/material";
import { MainContext } from "@src/components/top/Main";
import React, { useContext } from "react";

type TypeSelectButtonProps = {
  type: string;
  imagetype: string;
};

function TypeSelectButton({ type, imagetype }: TypeSelectButtonProps) {
  const context = useContext(MainContext);

  const box1: any = document.getElementById(type);
  if (box1) {
    box1.addEventListener("mouseover", function () {
      context.hoverTypeAdd(type);
    });
    box1.addEventListener("mouseleave", function () {
      context.hoverTypeAdd("");
    });
  }

  return (
    <Fab
      variant="extended"
      // color="success"
      className={
        context.type.SelectType == type
          ? "!bg-opacity-90 !flex !flex-col !w-1/4 !h-1/3 !mt-16 !ml-4 !pt-2 !pb-2 !text-center !cursor-pointer !bg-blue-800"
          : "!flex !flex-col !w-1/4 !h-1/3 !mt-16 !ml-4 !pt-2 !pb-2 !text-center !cursor-pointer"
      }
      id={type}
      sx={{ backgroundColor: "#CCF" }}
      onClick={() => {
        context.selectTypeChange(type);
      }}
      onMouseOver={() => {
        const element = document.getElementById(type);
        if (element) {
          element.style.backgroundColor = "#1565c0";
        }
      }}
      onMouseOut={() => {
        const element = document.getElementById(type);
        if (element) {
          element.style.backgroundColor = "#CCF";
        }
      }}
    >
      <div
        className="mb-2"
        style={{ backgroundColor: "rgba(255,255,255,0)", color: "white" }}
      >
        {type}
      </div>
      <img src={`images/${imagetype}.png`} className="w-9/12" alt={imagetype} />
    </Fab>
  );
}

export default TypeSelectButton;
