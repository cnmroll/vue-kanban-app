// Node.jsのrequireスタイルでインポート
const jwt = require("jsonwebtoken");
const fs = require("fs");
const PUBLIC_KEY = fs.readFileSync("./private/secret.pem.pub"); // 公開鍵
const { users, taskList, boardList } = require("./store");

const generateId = (value) => {
  let id = value;
  return () => {
    return id++;
  };
};
const generateTaskId = generateId(1);
const generateBoardId = generateId(1);
const generateTask = (boardId, titleValue, descriptionValue) => {
  const id = generateTaskId();
  return {
    id: id + "",
    title: titleValue || `title:task${id}`,
    description: descriptionValue || `description:task${id}`,
    boardId: boardId,
  };
};
const generateBoard = (userId) => {
  const id = generateBoardId();
  return {
    id: id + "",
    title: `title:board${id}`,
    userId: userId,
    // tasks: [...Array(id)].map(() => generateTask()),
  };
};

const verifyToken = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  //HeaderにAuthorizationが定義されているか
  if (authHeader === undefined) {
    res.status(401).json({ message: "header error" });
    return;
  }
  //Bearerが正しく定義されているか
  if (req.headers.authorization.split(" ")[0] === "Bearer") {
    try {
      const token = jwt.verify(authHeader.split(" ")[1], PUBLIC_KEY);
      if (!token) {
        res.status(402).json({ message: "ログインに失敗しました。" });
        return;
      }

      const user = users.find((user) => user.id === token.user.id);
      if (!user || Date.now() >= token.exp * 1000) {
        res.status(401).json({ message: "ログインに失敗しました。" });
        return;
      }
      //問題がないので次へ
      req.token = token;
      req.user = user;
      // console.log(token);

      next();
    } catch (e) {
      //tokenエラー
      console.log(e.message);
      res.status(403).json({ message: "ログインに失敗しました。" });
    }
  }
};

const getUserBoard = function (userId) {
  return boardList
    .filter((board) => {
      return userId === board.userId;
    })
    .sort((prev, next) => {
      return prev.order - next.order;
    })
    .map((board) => {
      return Object.assign(
        {
          tasks: taskList
            .filter((task) => {
              return board.id === task.boardId;
            })
            .sort((prev, next) => {
              return prev.order - next.order;
            }),
        },
        board
      );
    });
};

module.exports = {
  generateId: generateId,
  generateTaskId: generateTaskId,
  generateBoardId: generateBoardId,
  generateTask: generateTask,
  generateBoard: generateBoard,
  verifyToken: verifyToken,
  getUserBoard: getUserBoard,
};
