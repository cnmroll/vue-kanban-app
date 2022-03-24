<template>
  <div class="board-list">
    <Draggable
      v-model="boardList"
      tag="transition-group"
      :component-data="{ name: 'wrap' }"
      item-key="id"
      draggable=".task-board"
    >
      <template #item="{ element }">
        <TodoBoard :board="element"></TodoBoard>
      </template>
      <!-- <TodoBoard
        v-for="board in boardList"
        :key="board.id"
        :board="board"
      ></TodoBoard> -->
    </Draggable>
  </div>
</template>

<script setup lang="ts">
import TodoBoard from "./TodoBoard.vue";
import Draggable from "vuedraggable";
import { computed } from "@vue/runtime-core";
import { useStore } from "@/store";
import { onBeforeMount } from "vue";
import Actions from "@/store/actions";
import { Board } from "@/types/task";

const store = useStore();
const boardList = computed({
  get: () => store.state.boardList,
  set: (value: Array<Board>) => {
    value.forEach((board, index) => {
      board.order = index;
    });
    console.log("board update", value);
    store.dispatch(Actions.orderBoard.name, value).catch((e) => {
      throw e;
    });
  },
});
const fetchBoardList = onBeforeMount(async () => {
  await store.dispatch(Actions.fetchBoardList.name);
});
</script>

<style scoped lang="scss">
.board-list {
  display: flex;
  overflow-x: scroll;
}
</style>
