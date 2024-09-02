<script setup lang="ts">
import { ref } from "vue";
import { type TTask } from "@/@types/todo";

defineProps<{ task: TTask }>();

const taskDone = ref(false);
const modalIsVisible = ref(false);

const toogleTask = () => {
  taskDone.value = !taskDone.value;
};

const closeModal = () => {
  modalIsVisible.value = false;
};
</script>

<template>
  <div
    :datatype-id="task.id"
    class="w-full bg-blue-50 p-4 border border-neutral-500 rounded-xl flex flex-col gap-4"
  >
    <div class="flex justify-between gap-4">
      <h2 :class="{ 'line-through': taskDone }">{{ task.label }}</h2>
      <div class="flex gap-2">
        <button class="h-10 bg-green-500 rounded-lg p-2" @click="toogleTask">
          Done
        </button>
        <button
          class="h-10 bg-neutral-300 rounded-lg p-2"
          @click="modalIsVisible = true"
        >
          Menu
        </button>
      </div>
    </div>

    <div
      v-if="task.subtasks && task.subtasks?.length > 0"
      class="flex flex-col items-center w-full gap-4"
    >
      <TaskCard
        v-for="sustask of task.subtasks"
        :key="sustask.id"
        :task="sustask"
      />
    </div>
    <TaskModal
      v-if="modalIsVisible"
      :is-visible="modalIsVisible"
      :task="task"
      @close-modal="closeModal"
    />
  </div>
</template>
