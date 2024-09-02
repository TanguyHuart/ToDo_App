<script setup lang="ts">
import { type TTask } from "@/@types/todo";

defineProps<{ task: TTask; index: number }>();
</script>

<template>
  <div
    :datatype-id="task.id"
    class="w-full bg-blue-50 p-4 border border-neutral-500 rounded-xl flex flex-col gap-4"
  >
    <h2>{{ task.label }}</h2>

    <div
      v-if="task.subtasks && task.subtasks?.length > 0"
      class="flex flex-col items-center w-full gap-4"
    >
      <TaskCard
        v-for="sustask of task.subtasks"
        :key="sustask.id"
        :index="sustask.id"
        :task="sustask"
      />
    </div>
  </div>
</template>
