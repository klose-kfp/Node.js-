import React, { useState } from "react";
import "./Login.css";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { AppDispatch } from "@src/store/index";
import { useSelector } from "@src/store/index";
import { LoginUser } from "@src/store/users";
import { Button, Stack } from "@mui/material";
import InputMailAddress from "./form/InputMailAddress";
import InputPassword from "./form/InputPassword";

import type { UserState } from "@src/types/types";
import TypingAnimation from "@src/function/TypingAnimation";
import Download from "@src/function/Download";
import BasicTabs from "@src/function/CustomTabPanel";

type LoginProps = {};

function Login(props: LoginProps) {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState<UserState>({
    email: "",
    pass: "",
    showPassword: false,
  });

  const { loading, error } = useSelector((state) => state.user);

  const userLogin = async () => {
    const userCredentials = {
      userEmail: state.email,
      userPass: state.pass,
    };
    const result = await dispatch(await LoginUser(userCredentials));
    if (result.payload) {
      setState({
        ...state,
        email: "",
        pass: "",
      });
      navigate("/main");
    }
  };

  function toSignup() {
    navigate("/signup");
  }

  function pressEnter(e: any) {
    if (e.key == "Enter") {
      userLogin();
    }
  }

  return (
    <div className="flex">
      <div className="login-page mt-24">
        <div className="login-title text-center mr-16 text-2xl">
          F.IT 〜First IT〜
        </div>

        <div id="login-main">
          <div id="loginMsg" className="pt-4 pb-2 pl-1">
            <p>ログインしてください</p>
          </div>

          <div className="login-form">
            <Stack>
              <InputMailAddress
                value={state.email}
                onChange={(newValue) => setState({ ...state, email: newValue })}
              />

              <InputPassword
                value={state.pass}
                showPass={state.showPassword}
                onChange={(newValue) => setState({ ...state, pass: newValue })}
                onKeyDown={(e: any) => pressEnter(e)}
              />

              <FormControlLabel
                label="パスワードを表示"
                control={
                  <Checkbox
                    checked={state.showPassword}
                    onChange={(e) =>
                      setState({ ...state, showPassword: e.target.checked })
                    }
                    value="primary"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                }
              />
            </Stack>
            <Button variant="contained" className="mt-2" onClick={userLogin}>
              {loading ? "Loading..." : "Login"}
            </Button>

            {error && (
              <div className="bg-red-500 text-white p-4" role="alert">
                {error}
              </div>
            )}
          </div>

          <div className="ToSignup-button mt-2">
            <a className="cursor-pointer hover:text-red-500" onClick={toSignup}>
              新規登録画面へ
            </a>
          </div>
        </div>
      </div>
      <TypingAnimation />
    </div>
  );
}

export default Login;
