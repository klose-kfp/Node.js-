import React, { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

function SignupSuccess() {
  // データ受け取り用
  const location = useLocation();
  const [selectId, setSelectId] = useState(location.state);

  const navigate = useNavigate();

  // function ToLogin() {
  //   navigate("/");
  // }

  return (
    <div className="signupsuccess-page">
      <div id="signupsuccess-main">
        <div id="signupsuccessMsg">
          <p>以下の内容で仮登録を行いました。</p>
          <p>登録にアドレスに送信された本登録用メールより</p>
          <p>本登録を行なってください</p>
          <p>※本登録後ログイン可能となります</p>
        </div>

        <div className="signupsuccess-text">
          <div className="signupsuccess-mail">email{selectId.UserEmail}</div>

          <div className="signupsuccess-username">
            username:{selectId.UserName}
          </div>

          <div className="signupsuccess-password">password:xxxxxxx</div>
        </div>

        {/* <div className="Back-button">
          <input type="button" value="ログイン画面へ" onClick={ToLogin} />
        </div> */}
      </div>
    </div>
  );
}

export default SignupSuccess;
