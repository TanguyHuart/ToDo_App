<script setup lang="ts">
import { useState } from "#app";
import type { TTask } from "~/@types/todo";

defineProps<{ task: TTask }>();

const taskList = useState<TTask[]>("list");
const modaleIsVisible = useState("modal");

const closeModale = () => {
  modaleIsVisible.value = false;
};

// pour la fonction d'ajout , on génère l'id en fonction de l'id de ses parents sous la forme 1.2.4
// pour la fonction de suppression, il faut parcourir le tableau de tache trouver la tache ayant le bon id et la supprimer de l'array subtask de son parent. boucle for.
// pour la fonction de modification , trouver la tache en parcourant le tableau et modifier ses propriété
// attention: tableau potentiellement infini donc fonction récursive.
</script>

<template>
  <div
    class="border bg-white rounded fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4"
  >
    <button class="absolute top-0 right-0 font-bold p-2" @click="closeModale">
      X
    </button>
    <div class="flex flex-col gap-4">
      <p>{{ task.label }}</p>
      <div class="flex gap-4">
        <button class="w-20 bg-red-500 px-2">X</button>
        <button class="w-20 border px-2">Modifier</button>
        <button class="w-20 border bg-blue-200 px-2">Sous-tâche</button>
      </div>
    </div>
  </div>
</template>
