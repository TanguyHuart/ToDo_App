<template>
  <div
    class="w-screen min-h-screen bg-gradient-to-br from-indigo-400 to-cyan-200 font-sans overflow-auto"
  >
    <main class="p-4 flex flex-col gap-4 font-roboto md:w-4/6 mx-auto">
      <h1 class="text-3xl text-center font-bold font-hand uppercase">
        -- My ToDo List --
      </h1>
      <div class="md:flex items-center">
        <ToDoForm />
        <ImportJson />
      </div>

      <TasksList />
      <div
        v-if="taskCreated"
        class="fixed w-1/2 h-10 bg-green-200 top-10 left-1/4 border border-green-700 rounded flex items-center justify-center animate-bounce"
      >
        <p class="text-center text-xl text-green-900">Task created !</p>
      </div>
      <div
        v-if="error"
        class="fixed w-1/2 h-10 bg-red-200 top-10 left-1/4 border border-green-700 rounded flex items-center justify-center animate-bounce"
      >
        <p class="text-center text-xl text-red-900">Error : {{ error }}</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useState } from "#app";
import { watch } from "vue";
import { useHead } from "@unhead/vue";

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Shantell+Sans:ital,wght@0,300..800;1,300..800&display=swap",
    },
  ],
});

const taskCreated = useState("taskCreated", () => false);
const error = useState("error", () => "");

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

watch(error, (newValue) => {
  if (newValue) {
    const timeout = setTimeout(() => {
      error.value = "";
    }, 6000);
    return () => {
      clearTimeout(timeout);
    };
  }
});
</script>
