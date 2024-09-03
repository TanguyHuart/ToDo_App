<script setup lang="ts">
import { useState } from "#app";
import { v4 as uuidv4 } from "uuid";
import type { TTask } from "~/@types/todo";
import { writeTasksData } from "~/utils/writeData";

const taskList = useState<TTask[]>("list");
const input = useState<string>("input", () => "");

// fonction spécifique d'ajout de tache 1er degres de parenté, fonctionne que si un input est rentré.

const addTask = (e: Event) => {
  e.preventDefault();
  if (input.value) {
    const taskToAdd: TTask = {
      id: uuidv4(),
      label: input.value,
      subtasks: [],
      isDone: false,
      // index: taskList.value.length + 1,
    };
    taskList.value.push(taskToAdd);
    input.value = "";
    writeTasksData(taskList.value);
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
        <label for="input">La tâche a effectuer :</label>
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
