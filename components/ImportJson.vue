<template>
  <div class="bg-white p-4 rounded-xl">
    <div>
      <p>Tu peux télécharger ta liste des tâches ici !</p>
      <a href="/assets/data/data.json" download>
        <button class="bg-blue-400 p-2 rounded-lg border">
          Dl la liste de tâche
        </button>
      </a>
    </div>
    <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
      <div class="flex flex-col gap-4">
        <label for="file"
          >Ou Tu peux exporter ta propre liste de tâche ? VAZY Upload la !
        </label>

        <input
          id="file"
          type="file"
          name="file"
          accept="application/json"
          @change="fileChosen"
        />
      </div>
      <button
        v-if="inputFileIsFull"
        type="submit"
        class="bg-blue-400 p-2 rounded-lg"
      >
        Exporter la liste !
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useState } from "#app";

const taskList = useState("list");
const jsonData = ref(null);
const inputFileIsFull = ref(false);

const fileChosen = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.value.length > 0) {
    inputFileIsFull.value = true;
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
