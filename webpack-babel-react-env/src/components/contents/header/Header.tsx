import React, { useContext } from "react";
import "./Header.css";

import Guidance from "./guidance/Guidance";
import { MainContext } from "@src/components/top/Main";

function Header() {
  const context = useContext(MainContext);

  if (context.type.DisplayType == "form") {
    return (
      <nav className="header ">
        <Guidance />
      </nav>
    );
  } else if (context.type.DisplayType == "past") {
    return;
    // <div>aaa</div>;
  }
}

export default Header;
