<template>
  <div class="todo-task-card-header">
    <div class="todo-task-card-header-title">{{ task.title }}</div>
    <div class="todo-task-card-header-operation">
      <TodoButton :click="deleteTask">-</TodoButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Task } from "@/types/task";
import TodoButton from "@/components/atoms/TodoButton.vue";

const props = defineProps<{
  task: Task;
  deleteTask: () => void;
}>();
</script>

<style scoped lang="scss">
.todo-task-card-header {
  border-bottom: solid;
  display: flex;
  padding: 5px;
}
.todo-task-card-header-title {
  margin-right: auto;
}
</style>
