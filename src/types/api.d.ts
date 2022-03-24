import { Board } from "@/types/task";

export interface ResponseFetchBoardList {
  boardList: Array<Board>;
}

export interface RequestAddTask {
  boardId: string;
  title: string;
  description: string;
}
