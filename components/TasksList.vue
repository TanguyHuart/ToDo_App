<script setup lang="ts">
import { useState } from "#app";
// import de la donnée dans le json
import data from "@/assets/data/data.json";

// initialisation d'un store contenant les donnée disponible dans le reste de l'app
const taskList = useState("list", () => data);
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-4">
    <TaskCard
      v-for="(task, index) of taskList"
      :key="index"
      :task="task"
      :index="index"
    />
  </div>
</template>
