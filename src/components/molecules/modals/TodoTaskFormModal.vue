<template>
  <Modal
    :okButton="{
      event: addTask,
      disabled: disableAddTask,
      text: '追加',
    }"
    :closeEvent="closeEvent"
    title="タスク追加"
  >
    <input type="text" name="title" placeholder="タイトル" v-model="title" />
    <input
      type="textarea"
      name="description"
      placeholder="内容"
      v-model="description"
    />
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/molecules/modals/Modal.vue";
import TodoButton from "@/components/atoms/TodoButton.vue";
import { Board } from "@/types/task";
import { ref } from "vue";
import { computed } from "@vue/runtime-core";
import { nextTick } from "vue";
import { useStore } from "@/store";
import Actions from "@/store/actions";

const props = defineProps<{
  board: Board;
  closeEvent: () => void;
}>();

const progress = ref(false);
const error = ref("");
const store = useStore();
const title = ref("");
const required = (val: string) => !!val.trim();
const description = ref("");

const validation = computed(() => {
  return {
    title: {
      required: required(title.value),
    },
    description: {
      required: required(description.value),
    },
  };
});

const valid = computed(() => {
  return Object.values(validation.value).every((target) => {
    return Object.values(target).every((result) => {
      return result;
    });
  });
});

const disableAddTask = computed(() => !valid.value || progress.value);

const addTask = () => {
  if (disableAddTask.value) {
    return;
  }

  progress.value = true;
  error.value = "";

  nextTick(() => {
    store
      .dispatch(Actions.addTask.name, {
        boardId: props.board.id,
        title: title.value,
        description: description.value,
      })
      .then(() => {
        progress.value = false;
        title.value = "";
        description.value = "";
        props.closeEvent();
        console.log("addActionThen");
      })
      .catch((err) => {
        console.log(err.message);
        error.value = err.message;
      });
  });
};
</script>

<style scoped lang="scss">
.todo-task-form {
  border-top: solid;
  padding: 5px;
  ::v-deep button {
    display: block;
    width: 100%;
    height: 100%;
  }
}
input {
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin: 5px 0px;
}
button >>> {
  display: block;
  width: 100%;
  //   box-sizing: border-box;
}
</style>
