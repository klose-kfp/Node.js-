import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputMailAddress from "./form/InputMailAddress";
import InputPassword from "./form/InputPassword";
import { Checkbox, FormControlLabel, Stack } from "@mui/material";
import InputUserName from "./form/InputUserName";

import type { SignupState } from "@src/types/types";
import { errorHandle } from "@src/error/errorHandle";

type SignupProps = {};

function Signup(props: SignupProps) {
  const navigate = useNavigate();

  const [state, setState] = useState<SignupState>({
    email: "",
    username: "",
    pass: "",
    repass: "",
    showPassword: false,
  });

  async function SignupUser() {
    const post: any = await axios
      .post(process.env.REACT_APP_AXIOS_ADDRESS + "api/auth/users/", {
        email: state.email,
        username: state.username,
        password: state.pass,
        re_password: state.repass,
      })
      .catch((err) => {
        errorHandle(err, "User:");
        navigate("/error");
      });
    navigate("/signup/success", {
      state: {
        UserEmail: state.email,
        UserName: state.username,
      },
    });
    console.log(state);
  }

  function ToLogin() {
    navigate("/");
  }
  function pressEnter(e: any) {
    if (e.key == "Enter") {
      SignupUser();
    }
  }

  return (
    <div className="signup-page">
      <Stack>
        <div id="signMsg">
          <p>メールアドレス・ユーザーネーム・パスワードを登録してください</p>
        </div>

        <InputMailAddress
          value={state.email}
          onChange={(newValue) => setState({ ...state, email: newValue })}
        />

        <InputUserName
          value={state.username}
          onChange={(newValue) => setState({ ...state, username: newValue })}
        />

        <InputPassword
          value={state.pass}
          showPass={state.showPassword}
          onChange={(newValue) => setState({ ...state, pass: newValue })}
          onKeyDown={(e: any) => pressEnter(e)}
        />
        <InputPassword
          value={state.repass}
          showPass={state.showPassword}
          onChange={(newValue) => setState({ ...state, repass: newValue })}
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
        <div className="Toroku-button">
          <input type="button" value="登録" onClick={SignupUser} />
        </div>
        <div className="ToLogin-button">
          <input type="button" value="ログイン画面へ" onClick={ToLogin} />
        </div>
      </Stack>
    </div>
  );
}

export default Signup;
