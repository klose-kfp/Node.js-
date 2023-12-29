import React, { useState } from "react";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate, useLocation } from "react-router-dom";

function UserDeleteSuccess() {
  // データ受け取り用
  const location = useLocation();
  const [selectId, setSelectId] = useState(location.state);

  const navigate = useNavigate();

  function ToLogin() {
    createAsyncThunk("user/Logoutsuccess", async () => {
      await localStorage.removeItem("user");
    });
    navigate("/");
  }

  return (
    <div className="userdeletesuccess-page">
      <div id="userdeletesuccess-main">
        <div id="userdeletesuccessMsg">
          <p>以下のユーザーを削除しました</p>
        </div>

        <div className="userdeletesuccess-text">
          <div className="userdeletesuccess-email">
            email:{selectId.nowUserEmail}
          </div>

          <div className="userdeletesuccess-username">
            username:{selectId.nowUserName}
          </div>
        </div>

        <div className="Back-button">
          <input type="button" value="ログイン画面へ" onClick={ToLogin} />
        </div>
      </div>
    </div>
  );
}

export default UserDeleteSuccess;
