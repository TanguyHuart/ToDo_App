<script setup lang="ts">
import { ref } from "vue";
import { useState } from "#app";

const taskList = useState("list");
const error = useState("error");
const jsonData = ref(null);
const inputFileIsFull = ref(false);
const fileName = ref("");

const fileChosen = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.value.length > 0) {
    inputFileIsFull.value = true;
    fileName.value = input.value.substring(input.value.lastIndexOf("\\") + 1);
  } else {
    inputFileIsFull.value = false;
  }
};

const handleSubmit = (event: Event) => {
  inputFileIsFull.value = false;
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  const file = formData.get("file") as File | null;

  if (file) {
    readFile(file);
  } else {
    error.value = "No file selected!";
  }
};

const readFile = (file: File) => {
  const reader = new FileReader();
  reader.onload = async (event) => {
    try {
      jsonData.value = JSON.parse(event.target?.result as string);

      const res = await fetch("/api/write-file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData.value),
      });
      const result = await res.json();
      if (result.success) {
        taskList.value = result.taskList;
      } else {
        error.value = "Error to save Data";
      }
    } catch {
      error.value = "Error when importing Tasks File";
    }
  };
  reader.readAsText(file);
};
</script>

<template>
  <div class="p-4 rounded-xl flex flex-col gap-4 w-fit">
    <div class="flex gap-4">
      <a href="/api/export-data" download="data.json">
        <button
          class="bg-orange-300 p-2 flex flex-col items-center rounded-lg shadow-md transition-all hover:bg-amber-500"
        >
          Download
          <img
            src="/icons/download.png"
            alt="dl-icon"
            title="Download Tasks"
            class="w-6"
          />
        </button>
      </a>
      <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
        <div class="flex gap-4 items-center">
          <label
            for="file"
            class="bg-orange-300 p-2 flex flex-col items-center shadow-md rounded-lg transition-all hover:bg-amber-500"
            >Import
            <img src="/icons/share.png" alt="import-icon" class="w-6" />
          </label>

          <input
            id="file"
            type="file"
            name="file"
            accept="application/json"
            class="hidden"
            @change="fileChosen"
          />
        </div>
        <div>
          <p v-if="inputFileIsFull">
            This file ? <span class="text-red-500">{{ fileName }}</span>
          </p>
          <button
            v-if="inputFileIsFull"
            type="submit"
            class="bg-orange-300 p-2 rounded-lg shadow-md transition-all hover:bg-amber-500"
          >
            Import!
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
