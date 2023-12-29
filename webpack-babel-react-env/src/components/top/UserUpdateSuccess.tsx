import React, { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

function UserUpdateSuccess() {
  // データ受け取り用
  const location = useLocation();
  const [selectId, setSelectId] = useState(location.state);

  const navigate = useNavigate();

  function ToLogin() {
    navigate("/");
  }

  return (
    <div className="userupdatesuccess-page">
      <div id="userupdatesuccess-main">
        <div id="userupdatesuccessMsg">
          <p>ユーザー情報を更新しました</p>
        </div>

        <div className="userupdatesuccess-text">
          <div className="userupdatesuccess-username">
            userneme:{selectId.nowUserName}
          </div>

          <div className="userupdatesuccess-mail">
            email:{selectId.nowUserEmail}
          </div>
        </div>

        <div className="Back-button">
          <input type="button" value="ログイン画面へ" onClick={ToLogin} />
        </div>
      </div>
    </div>
  );
}

export default UserUpdateSuccess;
