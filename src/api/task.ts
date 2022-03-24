import client, { createAuthorization } from "./client";
import { RequestAddTask, ResponseFetchBoardList } from "@/types/api";
import { Task, Board } from "@/types/task";

export default {
  fetchBoardList: (token?: string): Promise<ResponseFetchBoardList> => {
    return new Promise((resolve, reject) => {
      client
        .get(`/api/boards`, createAuthorization(token))
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(new Error(err.response.data.message || err.message));
        });
    });
  },
  addTask: (
    params: RequestAddTask,
    token?: string
  ): Promise<ResponseFetchBoardList> => {
    return new Promise((resolve, reject) => {
      client
        .put(`/api/boards/create`, params, createAuthorization(token))
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(new Error(err.response.data.message || err.message));
        });
    });
  },
  deleteTask: (task: Task, token?: string): Promise<ResponseFetchBoardList> => {
    return new Promise((resolve, reject) => {
      client
        .put(`/api/tasks/${task.id}/delete`, {}, createAuthorization(token))
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(new Error(err.response.data.message || err.message));
        });
    });
  },
  order: (
    tasks: Array<Task>,
    token?: string
  ): Promise<ResponseFetchBoardList> => {
    return new Promise((resolve, reject) => {
      client
        .put(`/api/tasks/order`, { tasks: tasks }, createAuthorization(token))
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(new Error(err.response.data.message || err.message));
        });
    });
  },
  orderBoard: (
    board: Board,
    token?: string
  ): Promise<ResponseFetchBoardList> => {
    return new Promise((resolve, reject) => {
      client
        .put(
          `/api/boards/order`,
          { boardList: board },
          createAuthorization(token)
        )
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(new Error(err.response.data.message || err.message));
        });
    });
  },
};
