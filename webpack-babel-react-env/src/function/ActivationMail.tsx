import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";

function ActivationMail() {
  const { uid, token } = useParams();

  // uidとtokenを利用した処理をここに追加
  async function Activation() {
    const request = await axios.post(
      process.env.REACT_APP_AXIOS_ADDRESS + "/api/auth/users/activation/",
      {
        uid: uid,
        token: token,
      }
    );
  }

  return (
    <div>
      <h2>以下をクリックして、本登録を完了してください</h2>
      <a onClick={Activation}>こちらをクリック！！</a>
    </div>
  );
}

export default ActivationMail;
