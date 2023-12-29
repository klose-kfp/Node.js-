import React from "react";
import "./Top.css";

import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Top() {
  const navigate = useNavigate();

  function toLogin() {
    navigate("/login");
  }

  function toSignup() {
    navigate("/signup");
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div>Top</div>

      <div className="ToLogin-button">
        <Button variant="contained" onClick={toLogin}>
          ログイン画面へ
        </Button>
      </div>

      <div className="ToSignup-button">
        <Button variant="contained" onClick={toSignup}>
          新規登録
        </Button>
      </div>
    </div>
  );
}

export default Top;
