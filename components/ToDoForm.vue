<script setup lang="ts">
import { useState } from "#app";
import type { TTask } from "~/@types/todo";

const taskList = useState<TTask[]>("list");
const input = useState<string>("input", () => "");

const addTask = (e: Event) => {
  e.preventDefault();
  if (input.value) {
    const taskToAdd: TTask = {
      id: (taskList.value.length + 1).toString(),
      label: input.value,
      subtasks: [],
    };
    taskList.value.push(taskToAdd);
    input.value = "";
    return taskToAdd;
  }
};
</script>

<template>
  <div
    class="flex flex-col bg-white border border-neutral-500 rounded-xl w-full p-4"
  >
    <h2>Ceci est le fomulaire pour ma todo !</h2>
    <form action="" class="form">
      <div class="flex gap-4 items-center">
        <label for="input ">La tâche a effectuer :</label>
        <input
          id="input"
          v-model="input"
          type="text"
          placeholder="Entrez votre texte ici"
          class="border border-black rounded p-2 focus:border-2"
        />
      </div>
      <button class="bg-blue-400 border p-2 rounded" @click="addTask">
        Ajouter une tâche
      </button>
    </form>
  </div>
</template>
