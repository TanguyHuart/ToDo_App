<script setup lang="ts">
import { useState } from "#app";
import { v4 as uuidv4 } from "uuid";
import type { TTask } from "~/@types/todo";
import { writeTasksData } from "~/utils/writeData";

const taskList = useState<TTask[]>("list");
const input = useState<string>("input", () => "");
const taskCreated = useState("taskCreated");

// fonction spécifique d'ajout de tache 1er degres de parenté, fonctionne que si un input est rentré.

const addTask = (index: number) => {
  if (input.value) {
    const taskToAdd: TTask = {
      id: uuidv4(),
      label: input.value,
      subtasks: [],
      isDone: false,
      color: "#fefce8",
    };
    taskList.value.splice(index, 0, taskToAdd);
    input.value = "";
    taskCreated.value = true;
    writeTasksData(taskList.value);
  }
};
</script>

<template>
  <div class="flex flex-col w-full p-4">
    <div class="flex flex-col gap-4 items-center">
      <label for="input" class="text-lg font-bold uppercase">New Task :</label>
      <div class="flex flex-wrap gap-4 items-end">
        <input
          id="input"
          v-model="input"
          type="text"
          placeholder="Please enter your text here"
          class="rounded p-2 focus:border-2"
          size="40"
        />
        <div v-if="input" class="flex flex-col gap-2">
          <p v-if="taskList.length > 0">In witch position ?</p>
          <div class="flex gap-2">
            <button
              v-for="task of taskList"
              :key="task.id"
              class="bg-green-500 shadow-md p-2 rounded-lg transition-all hover:bg-green-600 w-10"
              @click="addTask(taskList.indexOf(task))"
            >
              {{ taskList.indexOf(task) + 1 }}
            </button>
            <button
              v-if="taskList.length > 0"
              class="bg-green-500 shadow-md p-2 rounded-lg transition-all hover:bg-green-600 w-10"
              @click="addTask(taskList.length)"
            >
              {{ taskList.length + 1 }}
            </button>
            <button
              v-if="taskList.length === 0"
              class="bg-green-500 p-2 border rounded w-10"
              @click="addTask(taskList.length)"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
