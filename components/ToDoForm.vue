<script setup lang="ts">
import { useState } from "#app";
import { v4 as uuidv4 } from "uuid";
import type { TTask } from "~/@types/todo";
import { writeTasksData } from "~/utils/writeData";

const taskList = useState<TTask[]>("list");
const input = useState<string>("input", () => "");
const taskCreated = useState("taskCreated");

// fonction spécifique d'ajout de tache 1er degres de parenté, fonctionne que si un input est rentré.

const addTask = (e: Event, index: number) => {
  e.preventDefault();
  if (input.value) {
    const taskToAdd: TTask = {
      id: uuidv4(),
      label: input.value,
      subtasks: [],
      isDone: false,
    };
    taskList.value.splice(index, 0, taskToAdd);
    input.value = "";
    taskCreated.value = true;
    writeTasksData(taskList.value);
    return taskToAdd;
  }
};
</script>

<template>
  <div class="flex flex-col w-full p-4">
    <form action="" class="">
      <div class="flex flex-col gap-4 items-start">
        <label for="input" class="text-lg font-bold uppercase"
          >Nouvelle Tâche :</label
        >
        <div class="flex gap-4 items-center">
          <input
            id="input"
            v-model="input"
            type="text"
            placeholder="Entrez votre texte ici"
            class="rounded p-2 focus:border-2 h-10"
          />
          <div v-if="input" class="flex flex-col gap-2">
            <p>En quel position ?</p>
            <div class="flex gap-2">
              <button
                v-for="task of taskList"
                :key="task.id"
                class="bg-green-500 shadow-md p-2 rounded-lg transition-all hover:bg-green-600 w-10"
                @click="addTask($event, taskList.indexOf(task))"
              >
                {{ taskList.indexOf(task) + 1 }}
              </button>
              <button
                class="bg-green-500 shadow-md p-2 rounded-lg transition-all hover:bg-green-600 w-10"
                @click="addTask($event, taskList.length)"
              >
                {{ taskList.length + 1 }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
