import axios from "axios";

import authHeader from "./headers";

async function getNowUser() {
  const response = await axios.get(
    process.env.REACT_APP_AXIOS_ADDRESS + "api/auth/users/me/",
    {
      headers: authHeader(),
    }
  );
  console.log(response);
  return response.data;
}

async function getChat() {
  const response = await axios.get(
    process.env.REACT_APP_AXIOS_ADDRESS + "chatget/",
    {
      headers: authHeader(),
    }
  );
  console.log(response);
  return response.data;
}

async function getMessage() {
  const response = await axios.get(
    process.env.REACT_APP_AXIOS_ADDRESS + "get_chatgpt/",
    {
      headers: authHeader(),
    }
  );
  console.log(response);
  return response.data;
}

const userService = {
  getNowUser,
  getChat,
  getMessage,
};

export default userService;
