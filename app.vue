<template>
  <div class="w-screen min-h-screen bg-blue-300 font-sans">
    <div
      v-if="taskCreated"
      class="fixed w-1/2 h-10 bg-green-200 top-32 left-1/4 border border-green-700 rounded flex items-center justify-center animate-bounce"
    >
      <p class="text-center text-xl text-green-900">Une tâche a été créee !</p>
    </div>
    <h1 class="text-3xl text-center font-bold">Ma petite liste de tâches</h1>

    <main class="p-4 flex flex-col gap-4">
      <ImportJson />
      <ToDoForm />
      <TasksList />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useState } from "#app";
import { watch } from "vue";
const taskCreated = useState("taskCreated", () => false);

watch(taskCreated, (newValue) => {
  if (newValue) {
    const timeout = setTimeout(() => {
      taskCreated.value = false;
    }, 6000);
    return () => {
      clearTimeout(timeout);
    };
  }
});
</script>
