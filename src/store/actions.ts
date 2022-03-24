import * as mutationTypes from "@/store/mutation-types";
import { Auth, Task } from "@/api";
import { AuthInfo, User } from "@/types/auth";
import { Task as TaskInfo, Board } from "@/types/task";
import { ActionContext } from "@/types/store";
import { RequestAddTask } from "@/types/api";

export default {
  login: ({ commit }: ActionContext, user: User) => {
    return Auth.login(user)
      .then((result) => {
        commit(mutationTypes.LOGIN, result);
      })
      .catch((err) => {
        throw err;
      });
  },
  logout: ({ commit }: ActionContext) => {
    commit(mutationTypes.LOGOUT);
  },
  fetchBoardList: ({ commit, state }: ActionContext) => {
    const token = state.auth?.token;
    // reguiredArg(reject, token);
    return Task.fetchBoardList(token)
      .then((result) => {
        commit(mutationTypes.FETCH_BOARD_LIST, result);
      })
      .catch((err) => {
        throw err;
      });
    // throw new Error("fetchBoardを実装してください");
  },
  addTask: (
    { commit, state }: ActionContext,
    requestAddTask: RequestAddTask
  ): Promise<void> => {
    const token = state.auth?.token;
    // return new Promise((resolve, reject) => {
    // reguiredArg(reject, token);
    return Task.addTask(requestAddTask, token)
      .then((result) => {
        // commit(mutationTypes.FETCH_BOARD_LIST, result);
        commit(mutationTypes.ADD_TASK, result);
      })
      .catch((err) => {
        throw err;
      });
    // });
  },
  deleteTask: ({ commit, state }: ActionContext, task: TaskInfo) => {
    const token = state.auth?.token;
    // reguiredArg(reject, token);
    return Task.deleteTask(task, token)
      .then((result) => {
        commit(mutationTypes.DELETE_TASK, result);
      })
      .catch((err) => {
        throw err;
      });
  },
  showTask: ({ commit }: ActionContext, authInfo: AuthInfo) => {
    throw new Error("showTaskを実装してください");
  },
  updateTask: ({ commit }: ActionContext, authInfo: AuthInfo) => {
    throw new Error("updateTaskを実装してください");
  },
  orderTask: ({ commit, state }: ActionContext, tasks: Array<TaskInfo>) => {
    const token = state.auth?.token;
    return Task.order(tasks, token)
      .then((result) => {
        commit(mutationTypes.CARD_ORDER, result);
      })
      .catch((err) => {
        throw err;
      });
  },
  orderBoard: ({ commit, state }: ActionContext, board: Board) => {
    const token = state.auth?.token;
    return Task.orderBoard(board, token)
      .then((result) => {
        commit(mutationTypes.BOARD_ORDER, result);
      })
      .catch((err) => {
        throw err;
      });
  },
};

function reguiredArg(reject: (err: Error) => void, token?: string) {
  if (token === undefined) {
    throw new Error("ログインしてください");
  }
}
