// Node.jsのrequireスタイルでインポート
const { generateBoard, generateTask } = require("./utils");
const { users, taskList, boardList } = require("./store");

module.exports = () => {
  users.forEach((user) => {
    [...Array(5)].map((_, id) => {
      let board = generateBoard(user.id);
      boardList.push(board);
      [...Array(id)].map(() => {
        let task = generateTask(board.id);
        taskList.push(task);
      });
    });
  });
};
