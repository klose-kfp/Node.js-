import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import authHeader from "./headers";

const patchNewUser = createAsyncThunk(
  "user/UpdateUser",
  async (NowUser: any) => {
    const request = await axios.patch(
      process.env.REACT_APP_AXIOS_ADDRESS + "api/auth/users/me/",
      {
        username: NowUser["NowUserName"],
        email: NowUser["NowUserEmail"],
      },
      { headers: authHeader() }
    );
    console.log(request);
    console.log(request.data);
  }
);

const DeleteUser = createAsyncThunk("user/UserDelete", async (NowUser: any) => {
  const request = await axios.delete(
    process.env.REACT_APP_AXIOS_ADDRESS + "api/auth/users/me/",
    {
      data: {
        current_password: NowUser["NowUserPass"],
      },
      headers: authHeader(),
    }
  );
  console.log(request);
  console.log(request.data);
});

async function sendGO(
  ProName: string,
  title: string,
  SVG: string,
  Mermaid: string,
  newQuestion: string
) {
  console.log(ProName);
  console.log(title);
  console.log(Mermaid);

  const request = await axios.post(
    process.env.REACT_APP_AXIOS_ADDRESS + "send_chatgpt/",
    {
      loginuser: ProName,
      author: ProName,
      Title: title,
      svg: SVG,
      Mermaid: Mermaid,
      text: newQuestion,
    },
    { headers: authHeader() }
  );
  // .catch((err) => console.log(err));
  console.log(ProName);
  console.log(title);
  console.log(Mermaid);

  console.log(request);
  // console.log(request.data);
}

const PostuserService = {
  patchNewUser,
  DeleteUser,
  sendGO,
};

export default PostuserService;
