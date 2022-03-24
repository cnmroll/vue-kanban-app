<template>
  <div class="task-card">
    <TodoTaskCardHeader
      :task="task"
      :deleteTask="deleteTask"
    ></TodoTaskCardHeader>
    <div class="task-card-contents">
      {{ task.description }}
    </div>
    <div class="task-card-footer">yyyymmdd</div>
  </div>
</template>

<script setup lang="ts">
import TodoTaskCardHeader from "@/components/molecules/TodoTaskCardHeader.vue";
import { Task } from "@/types/task";
import { useStore } from "@/store/index";
import Actions from "@/store/actions";

const store = useStore();
const props = defineProps<{
  task: Task;
}>();

const deleteTask = () => {
  store.dispatch(Actions.deleteTask.name, props.task).catch((e) => {
    throw e;
  });
};
</script>

<style scoped lang="scss">
.task-card {
  border: solid;
  margin: 5px;
  padding: 5px;
}
.task-card-footer {
  font-size: 0.5em;
  margin-left: auto;
  border-top: solid #eee;
  text-align: right;
}
</style>
