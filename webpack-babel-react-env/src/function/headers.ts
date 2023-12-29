export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user") as string);
  // console.log(user.access);
  if (user && user.access) {
    return {
      Authorization: user.access,
      // "JWT " + 削除
      "Content-Type": "application/json",
      //ここが"multipart/form-data"だと、リクエストの中身がundefinedになる
    };
  } else {
    return {};
  }
}
