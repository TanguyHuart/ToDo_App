<script setup lang="ts">
import { useState } from "#app";
import draggable from "vuedraggable";
// import de la donnée dans le json
import data from "@/assets/data/data.json";
import type { TTask } from "~/@types/todo";
import { writeTasksData } from "#imports";

// initialisation d'un store contenant les donnée disponible dans le reste de l'app

const taskList = useState<TTask[]>("list", () => data);
const onEnd = () => {
  writeTasksData(taskList.value);
};
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-4">
    <draggable
      v-model="taskList"
      item-key="id"
      class="w-full flex flex-col justify-center items-center gap-4"
      @end="onEnd"
    >
      <template #item="{ element, index }">
        <TaskCard :task="element" :index="index" />
      </template>
    </draggable>
  </div>
</template>
