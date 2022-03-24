<template>
  <div class="task-board">
    <TodoBoardHeader
      :board="board"
      :showTodoTaskForm="() => setAdd(true)"
    ></TodoBoardHeader>

    <div class="task-board-contents">
      <!-- <TaskCard
        v-for="task in board.tasks"
        :key="task.id"
        :task="task"
      ></TaskCard> -->
      <Draggable
        v-model="tasks"
        tag="transition-group"
        :component-data="{ name: 'fade', tag: 'div' }"
        item-key="id"
        group="Cards"
        draggable=".task-card"
      >
        <template #item="{ element }">
          <TaskCard :task="element"></TaskCard>
        </template>
      </Draggable>
    </div>
    <div class="task-board-footer">
      <TodoTaskFormModal
        :board="board"
        v-show="isAdd"
        :closeEvent="() => setAdd(false)"
      ></TodoTaskFormModal>
    </div>
  </div>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import TodoBoardHeader from "@/components/molecules/TodoBoardHeader.vue";
import TaskCard from "@/components/molecules/TodoTaskCard.vue";
import TodoTaskFormModal from "@/components/molecules/modals/TodoTaskFormModal.vue";
import Draggable from "vuedraggable";
import { Task } from "@/types/task";
import { computed } from "@vue/runtime-core";
import { Board } from "@/types/task";
import { ref } from "vue";
import { useStore } from "@/store";
import Actions from "@/store/actions";

const props = defineProps<{
  board: Board;
}>();

const store = useStore();
const tasks = computed({
  get: () => props.board.tasks,
  set: (value: Array<Task>) => {
    value.forEach((task) => {
      task.boardId = props.board.id;
    });
    store.dispatch(Actions.orderTask.name, value).catch((e) => {
      throw e;
    });
    console.log("card update", props.board.id, value);
  },
});

const isAdd = ref(false);

const setAdd = (visiable: boolean) => {
  isAdd.value = visiable;
};
</script>

<style scoped lang="scss">
.task-board {
  width: 300px;
  margin: 10px;
  margin: 5px;
  border: solid;
  // position: relative;
}
.task-board-contents {
  overflow-x: scroll;
}
.task-board-footer {
  // bottom: 0;
  // position: absolute;
  height: auto;
  bottom: 0%;
}
</style>
