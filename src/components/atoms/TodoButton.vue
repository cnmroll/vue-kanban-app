<template>
  <button type="”button”" @click="click" :class="classes" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  click?: () => void;
  classes?: Array<string>;
  disabled?: boolean;
}>();
</script>

<style></style>
