import React, { useContext } from "react";
import "./FormSlide.css";
import "./../Slide.css";
import Split from "react-split";
import FormSlideContents from "./FormSlideContents/FormSlideContents";
import Form from "./Form/Form";
import { MainContext } from "@src/components/top/Main";
import Loading from "@src/function/Loading";

function FormSlide() {
  const context = useContext(MainContext);

  if (context.type.loading === true) {
    return <Loading />;
  } else if (context.type.loading === false) {
    return (
      <Split
        className="flex formslide slide"
        gutter={() => {
          const gutterElement = document.createElement("div");
          gutterElement.className = `gutter1`;
          return gutterElement;
        }}
        gutterStyle={() => ({})}
        sizes={[50, 50]}
      >
        <Form />
        <FormSlideContents />
      </Split>
    );
  }
}

export default FormSlide;
