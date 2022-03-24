import { Board } from "@/types/task";
import { AuthInfo } from "@/types/auth";
import { ActionContext as BaseActionContext } from "vuex";

export interface State {
  auth?: AuthInfo;
  boardList: Array<Board>;
  error?: {
    content: Error;
    info: string;
  };
}
export type ActionContext = BaseActionContext<State, State>;
