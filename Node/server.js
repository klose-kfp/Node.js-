const express = require("express");
const app = express();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const cors = require("cors");
const config = require("./config");
const PORT = 8000;

const allowedOrigins = ["http://localhost:3000", "https://f-it-first.com"];
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// connection pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  port: "9000",
  user: "root",
  password: "root",
  database: "For-change-job",
});

//----------------ユーザー情報取得--------------------------
app.get("/api/auth/users/me", (req, res) => {
  // リクエストヘッダーやクエリパラメータからトークンを取得
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Not authorized" });
  }
  console.log(token);

  // トークン検証
  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // ユーザー情報を取得
    const userInfo = {
      email: decoded.email,
      username: decoded.username,
      // 他に必要な情報を追加
    };

    res.json(userInfo);
  });
});

//-------------------------------------------------------
//----------------GPTs情報取得--------------------------
app.get("/get_chatgpt", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw console.error(err.message);
    console.log("接続中・・・");

    // データ取得
    connection.query("SELECT * FROM GPTs", (err, data) => {
      connection.release();
      if (err) {
        console.error("クエリ実行エラー:", err.message);
        return res.status(500).send("クエリ実行エラー");
      }
      // 取得したデータをReactアプリケーションにレスポンスとして返す
      res.json(data);
    });
  });
});
//--------------------------------------------------------

//------------Singup--------------------------------------

app.post("/api/auth/users", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw console.error(err.message);
    console.log("接続中・・・" + req.body);

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    console.log(email, username, password);

    //hash化
    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
      if (hashErr) {
        console.error("ハッシュ化エラー:", hashErr.message);
        return res.status(500).send("Hashing Error");
      }
      // データ送信
      connection.query(
        `INSERT INTO User (email, username, password) VALUES ('${email}', '${username}', '${hashedPassword}')`,
        (queryErr) => {
          connection.release();
          if (queryErr) {
            console.error("アカウントの作成に失敗しました:", queryErr.message);
            return res.status(500).send("Signup Error");
          }
          console.log("アカウント作成完了！");
          const responseBody = { email, username };
          // 取得したデータをReactアプリケーションにレスポンスとして返す
          res.status(200).json(responseBody);
        }
      );
    });
  });
});

//--------------------------------------------------------

//------------アカウント情報の更新--------------------------------------

app.patch("/api/auth/users/me", authenticateToken, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("データベースへの接続に失敗しました");
    }

    const { username, email } = req.body;
    console.log(req.body);
    const userId = req.user.id; // トークンからユーザーIDを取得

    // ユーザー情報の変更クエリ
    const updateQuery = "UPDATE User SET username = ?, email = ? WHERE id = ?";

    // データベースクエリの実行
    connection.query(
      updateQuery,
      [username, email, userId],
      (error, results) => {
        // データベースの接続を解放
        connection.release();

        if (error) {
          console.error("ユーザー情報の変更に失敗しました:", error);
          return res.status(500).send("ユーザー情報の変更に失敗しました");
        }

        res.status(200).send("ユーザー情報が正常に変更されました");
        consolw.log("ユーザー情報が正常に変更されました");
      }
    );
  });
});

// JWT認証ミドルウェア
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send("トークンが提供されていません");
  }

  jwt.verify(token, "SECRET KEY", (err, user) => {
    if (err) {
      return res.status(403).send("トークンの検証に失敗しました");
    }

    req.user = user;
    next();
  });
}

//--------------------------------------------------------
//------------アカウント情報の削除--------------------------------------

app.delete("/api/auth/users/me", authenticateToken, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("データベースへの接続に失敗しました");
    }
    const userId = req.user.id; // トークンからユーザーIDを取得

    const deleteQuery = "DELETE FROM User WHERE id = ?";

    // データベースクエリの実行
    connection.query(deleteQuery, [userId], (error, results) => {
      if (error) {
        console.error("ユーザーの削除に失敗しました:", error);
        return res.status(500).send("ユーザーの削除に失敗しました");
      }

      res.status(200).send("ユーザーが正常に削除されました");
      console.log("ユーザーが正常に削除されました");
    });
  });
});
// JWT認証ミドルウェア
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send("トークンが提供されていません");
  }

  jwt.verify(token, "SECRET KEY", (err, user) => {
    if (err) {
      return res.status(403).send("トークンの検証に失敗しました");
    }

    req.user = user;
    next();
  });
}

//--------------------------------------------------------

//--------------------Login-------------------------------
app.post("/api/auth/jwt/create", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw console.error(err.message);
    console.log("接続中・・・");

    const { email, password } = req.body;

    // データベースからユーザーを取得
    connection.query(
      "SELECT * FROM User WHERE email = ?",
      [email],
      (queryErr, results) => {
        if (queryErr) {
          console.error("ログインエラー:", queryErr.message);
          return res.status(500).send("Login Error");
        }

        if (results.length === 0) {
          return res.status(401).send("Invalid username or password");
        }

        const user = results[0];

        // パスワードの比較
        bcrypt.compare(password, user.password, (compareErr, match) => {
          if (compareErr) {
            console.error("比較エラー:", compareErr.message);
            return res.status(500).send("Comparison Error");
          }

          if (!match) {
            return res.status(401).send("Invalid username or password");
          }

          const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
          };
          const token = jwt.sign(
            payload,
            config.jwt.secret,
            config.jwt.options
          );
          const responseBody = { email: email, access: token };
          res.status(200).json(responseBody);
          console.log("ログイン成功！！レッツハック！！");
        });
      }
    );
  });
});

//-----------------------------------------------------------
//------------GPTsのデータを送信--------------------------------------

app.post("/send_chatgpt", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw console.error(err.message);
    console.log("接続中・・・");

    const { loginuser, author, Title, text, Mermaid, svg } = req.body;

    console.log(req.body);
    // console.log(req);

    // データ送信
    connection.query(
      `INSERT INTO GPTs (loginuser, author, Title, text, Mermaid, svg) VALUES ('${loginuser}', '${author}', '${Title}', '${text}', '${Mermaid}', '${svg}')`,
      (queryErr) => {
        connection.release();
        if (queryErr) {
          console.error("データの作成に失敗しました:", queryErr.message);
          return res.status(500).send("Signup Error");
        }
        console.log("データ作成完了！");
        // 取得したデータをReactアプリケーションにレスポンスとして返す
        res.status(200).json(req.body);
      }
    );
  });
});

//--------------------------------------------------------

app.listen(PORT, () => console.log("サーバー起動中"));
