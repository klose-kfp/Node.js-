export function errorHandle(error: { message: string }, name: string) {
  console.log(name + error);
  if (error.message == "INVALID_REQUEST") {
    console.log(name + "パスワードとかが間違っているかも");
  } else if (error.message == "Request failed with status code 401") {
    console.log(name + "ログイン期限が切れています");
  } else if (error.message === "UNKNOWN_ERROR") {
    console.log(
      name + "レスポンスがJSONじゃなかったり、ネットワークエラーかも..."
    );
  } else if (error.message === "Request failed with status code 404") {
    console.log(name + "URLが間違っているかも...");
  } else if (error.message === "Server_Error") {
    console.log(name + "サーバー側が何かおかしいかも...");
  }
}
