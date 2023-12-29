import React, { useState, useEffect } from "react";

import "./UserUpdate.css";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import PostuserService from "@src/function/post_axios";
import type { AppDispatch } from "@src/store/index";
import InputUserName from "./form/InputUserName";
import InputMailAddress from "./form/InputMailAddress";
import InputPassword from "./form/InputPassword";
import { Button, Checkbox, FormControlLabel, Stack } from "@mui/material";

import type { UserDeleteUpdateState } from "@src/types/types";

type UserUpdateProps = {};

function UserUpdate(props: UserUpdateProps) {
  const dispatch: AppDispatch = useDispatch();

  const [state, setState] = useState<UserDeleteUpdateState>({
    email: "",
    username: "",
    pass: "",
    showPassword: false,
  });

  const navigate = useNavigate();
  // データ受け取り用
  const location = useLocation();
  const [selectId, setSelectId] = useState(location.state);

  useEffect(() => {
    setState({
      email: selectId.email,
      username: selectId.username,
      pass: "",
      showPassword: false,
    });
  }, []);

  const UpdateUser = async () => {
    let NowUser = {
      NowUserName: state.username,
      NowUserEmail: state.email,
    };
    const result = await dispatch(await PostuserService.patchNewUser(NowUser));
    console.log(result);
    if (result.type === "user/UpdateUser/fulfilled") {
      navigate("/userupdate/success", {
        state: { nowUserName: state.username, nowUserEmail: state.email },
      });
    }
  };

  function Back() {
    navigate("/main");
  }

  function ToDelete() {
    navigate("/userdelete", {
      state: { username: selectId.username, email: selectId.email },
    });
  }
  function pressEnter(e: any) {
    if (e.key == "Enter") {
      UpdateUser();
    }
  }

  return (
    <div className="userupdate-page">
      <div className="userupdate-main">
        <div className="userupdateMsg">
          <p>ユーザー情報の変更</p>
        </div>

        <div className="userupdate-form">
          <Stack>
            <InputUserName
              value={state.username}
              onChange={(newValue) =>
                setState({ ...state, username: newValue })
              }
            />

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
          <Button variant="contained" onClick={UpdateUser}>
            ユーザー情報変更
          </Button>
        </div>
      </div>
      <div className="button-zone">
        <div className="Back-button">
          <Button variant="contained" onClick={Back}>
            戻る
          </Button>
        </div>
        <div className="ToDelete-button">
          <Button variant="contained" onClick={ToDelete}>
            ユーザー削除ページへ
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserUpdate;
