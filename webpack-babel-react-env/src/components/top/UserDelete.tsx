import React, { useState } from "react";

import "./UserDelete.css";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import PostuserService from "@src/function/post_axios";
import type { AppDispatch } from "@src/store/index";
import InputPassword from "./form/InputPassword";
import { Button, Stack } from "@mui/material";

import type { UserDeleteUpdateState } from "@src/types/types";

type UserDeleteProps = {};

function UserDelete({}, props: UserDeleteProps) {
  const dispatch: AppDispatch = useDispatch();
  // データ受け取り用
  const location = useLocation();
  const [selectId, setSelectId] = useState(location.state);

  const [state, setState] = useState<UserDeleteUpdateState>({
    email: "",
    username: "",
    pass: "",
    showPassword: false,
  });

  //   POST用
  const navigate = useNavigate();

  const DeleteUser = async () => {
    let NowUser = {
      NowUserPass: state.pass,
    };
    const result = await dispatch(await PostuserService.DeleteUser(NowUser));
    console.log(result);
    if (result.type === "user/UserDelete/fulfilled") {
      navigate("/userdelete/success", {
        state: {
          nowUserEmail: selectId.email,
          nowUserName: selectId.username,
        },
      });
    }
  };

  function Back() {
    navigate("/userupdate", {
      state: { username: selectId.username, email: selectId.email },
    });
  }
  function pressEnter(e: any) {
    if (e.key == "Enter") {
      DeleteUser();
    }
  }

  return (
    <div className="delete-page">
      <Stack>
        <div id="deleteMsg">
          <p>以下のユーザーを削除しますか？</p>
        </div>

        <div id="delete-email">
          <p>email:{selectId.email}</p>
        </div>
        <div id="delete-username">
          <p>userneme:{selectId.username}</p>
        </div>

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
        <div className="delete-button">
          <Button variant="contained" onClick={DeleteUser}>
            ユーザー削除
          </Button>
        </div>
        <div className="Back-button">
          <Button variant="contained" onClick={Back}>
            戻る
          </Button>
        </div>
      </Stack>
    </div>
  );
}

export default UserDelete;
