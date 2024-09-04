<template>
  <div class="p-4 rounded-xl flex flex-col gap-4 w-fit">
    <div class="flex gap-4">
      <a href="/api/export-data" download="data.json">
        <button
          class="bg-orange-300 p-2 rounded-lg shadow-md transition-all hover:bg-amber-500"
        >
          Télécharge ta liste de tâche !
        </button>
      </a>
      <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
        <div class="flex gap-4 items-center">
          <label
            for="file"
            class="bg-orange-300 w-fit p-2 shadow-md rounded-lg transition-all hover:bg-amber-500"
          >
            Exporter le fichier !
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
      </form>
    </div>

    <div>
      <p v-if="inputFileIsFull">C'est ce fichier ? ==> {{ fileName }}</p>
      <button
        v-if="inputFileIsFull"
        type="submit"
        class="bg-orange-300 p-2 rounded-lg shadow-md transition-all hover:bg-amber-500"
      >
        Exporter la liste !
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useState } from "#app";

const taskList = useState("list");
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
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  console.log(formData);

  const file = formData.get("file") as File | null;

  console.log(file);

  if (file) {
    readFile(file);
  } else {
    console.error("Aucun fichier selectionné!");
  }
};

const readFile = (file: File) => {
  const reader = new FileReader();
  reader.onload = async (event) => {
    try {
      console.log("coucou");

      jsonData.value = JSON.parse(event.target?.result as string);
      console.log(jsonData.value);

      const res = await fetch("/api/import-json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData.value),
      });
      const result = await res.json();
      if (result.success) {
        console.log("Data saved !!!!");
        taskList.value = result.taskList;
      } else {
        console.error("Error to save data");
      }
    } catch {
      console.error("Erreur lors de la récup du fichier");
    }
  };
  reader.readAsText(file);
};
</script>
