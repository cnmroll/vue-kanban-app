<template>
  <div>
    <div class="error">
      <p class="display">
        予期しないエラーが発生しました。アプリケーション作成者に以下の情報といっしょにお問い合わせください。
      </p>
      <div class="details" v-if="error">
        <hr />
        <p class="messsage">エラーメッセージ: {{ error.content.message }}</p>
        <p class="info">エラー情報: {{ error.info }}</p>
        <p class="stack">エラー詳細: {{ error.content.stack }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store";

const store = useStore();

const error = computed(() => store.state.error);
</script>

<style lang="scss" scoped>
.error {
  color: red;
  text-align: left;
}
</style>
