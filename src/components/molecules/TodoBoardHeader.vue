<template>
  <div class="task-board-header">
    <span class="first-child">{{ board.title }}</span>
    <TodoButton :click="showTodoTaskForm">+</TodoButton>
  </div>
</template>

<script setup lang="ts">
import TodoButton from "@/components/atoms/TodoButton.vue";
import { Board } from "@/types/task";

const props = defineProps<{
  board: Board;
  showTodoTaskForm: () => void;
}>();
</script>

<style scoped lang="scss">
.task-board-header {
  display: flex;
  padding: 5px;
  border-bottom: solid;
}
.first-child {
  margin-right: auto;
}
</style>
