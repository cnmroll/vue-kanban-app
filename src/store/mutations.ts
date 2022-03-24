import * as MutationTypes from "@/store/mutation-types";
import { ResponseFetchBoardList } from "@/types/api";
import { AuthInfo } from "@/types/auth";
import { State } from "@/types/store";

export default {
  [MutationTypes.FETCH_BOARD_LIST](
    state: State,
    result: ResponseFetchBoardList
  ) {
    state.boardList = result.boardList;
  },
  [MutationTypes.ADD_TASK](state: State, result: ResponseFetchBoardList) {
    state.boardList = result.boardList;
  },
  [MutationTypes.DELETE_TASK](state: State, result: ResponseFetchBoardList) {
    state.boardList = result.boardList;
  },
  [MutationTypes.LOGIN](state: State, result: AuthInfo) {
    console.log(result);
    state.auth = result;
  },
  [MutationTypes.LOGOUT](state: State) {
    state.auth = undefined;
  },
  [MutationTypes.CARD_ORDER](state: State, result: ResponseFetchBoardList) {
    state.boardList = result.boardList;
  },
  [MutationTypes.BOARD_ORDER](state: State, result: ResponseFetchBoardList) {
    state.boardList = result.boardList;
  },
  [MutationTypes.SET_ERROR](
    state: State,
    payload?: { content: Error; info: string }
  ) {
    state.error = payload;
  },
};
