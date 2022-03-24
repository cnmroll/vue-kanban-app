// Node.jsのrequireスタイルでインポート
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const fs = require("fs");
const PRIVATE_KEY = fs.readFileSync("./private/secret.pem");
const { users, taskList, boardList } = require("./store");
const { getUserBoard, verifyToken, generateTask } = require("./utils");
require("./seed")();

// `Express`アプリケーションインスタンスを受取る関数をエクスポート
module.exports = ({ app }) => {
  // HTTPリクエストのbodyの内容をJSONとして解析するようミドルウェアをインストール
  app.use(bodyParser.json());

  app.post("/api/login", (req, res, next) => {
    const { email, password } = req.body;

    const user = users.find((user) => user.email === email);

    if (!user || user.password !== password) {
      res.status(401).json({ message: "ログインに失敗しました。" });

      return;
    }
    const option = {
      algorithm: "RS256", // 公開鍵・秘密鍵暗号化方式を指定
      expiresIn: "1h",
    };
    const token = jwt.sign({ user: { id: user.id } }, PRIVATE_KEY, option);
    res.json({
      user: user,
      token: token,
    });
  });

  app.get("/api/boards", verifyToken, (req, res) => {
    const user = req.user;

    res.json({ boardList: getUserBoard(user.id) });
  });

  app.put("/api/boards/create", verifyToken, (req, res) => {
    const user = req.user;

    const { boardId, description, title } = req.body;
    const board = getUserBoard(user.id).find((board) => board.id === boardId);

    if (!board) {
      res.status(404).json({ message: "該当のボードが存在しません" });
      return;
    }

    taskList.push(generateTask(board.id, title, description));

    res.json({ boardList: getUserBoard(user.id) });
  });

  app.put("/api/tasks/:taskId/delete", verifyToken, (req, res) => {
    const { taskId } = req.params;
    let index = taskList.findIndex((task) => {
      return task.id === taskId;
    });

    if (index < 0) {
      res.status(404).json({ message: "該当のタスクが存在しません" });
      return;
    }
    taskList.splice(index, 1);

    const user = req.user;
    res.json({ boardList: getUserBoard(user.id) });
  });

  app.put("/api/tasks/order", verifyToken, (req, res) => {
    const user = req.user;
    const { tasks } = req.body;

    tasks.forEach((targetTask) => {
      let task = taskList.find((task) => {
        return task.id === targetTask.id;
      });
      task.boardId = targetTask.boardId;
    });

    res.json({ boardList: getUserBoard(user.id) });
  });

  app.put("/api/boards/order", verifyToken, (req, res) => {
    const user = req.user;
    const { boardList: targetBoardList } = req.body;

    targetBoardList.forEach((targetBoard) => {
      let board = boardList.find((board) => {
        return targetBoard.id === board.id;
      });
      board.order = targetBoard.order;
    });

    res.json({ boardList: getUserBoard(user.id) });
  });
};
