<template>
  <div class="overlay">
    <div class="modal" v-if="this.$slots.context">
      <slot name="context" v-if="this.$slots.context" />
    </div>
    <div class="modal" v-else>
      <div class="modal__header">
        <span class="modal__header-title">
          <span v-if="title">{{ title }}</span>
        </span>
        <TodoButton :click="closeEvent">✕</TodoButton>
      </div>
      <div class="modal__contents"><slot /></div>
      <div class="modal__footer">
        <TodoButton
          :click="cancelButton.event"
          :disabled="cancelButton.disabled"
          v-if="cancelButton"
          >{{ cancelButton.text || "Cancel" }}
        </TodoButton>
        <TodoButton
          :click="okButton.event"
          :disabled="okButton.disabled"
          v-if="okButton"
          >{{ okButton.text || "OK" }}</TodoButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TodoButton from "@/components/atoms/TodoButton.vue";

const props = defineProps<{
  title?: string;
  closeEvent: () => void;
  okButton?: {
    disabled?: boolean;
    event?: () => void;
    text?: string;
  };
  cancelButton?: {
    disabled?: boolean;
    event?: () => void;
    text?: string;
  };
}>();
</script>

<style scoped lang="scss">
.overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  //   中心配置
  display: flex;
  align-items: center;
  justify-content: center;

  .modal {
    z-index: 2;
    width: 50%;
    padding: 1em;
    background: #fff;
    &__header {
      display: flex;
      &-title {
        margin-right: auto;
      }
    }
    &__footer {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
