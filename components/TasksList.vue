<script setup lang="ts">
import { useState } from "#app";
import { ref } from "vue";
import draggable from "vuedraggable";
// import de la donnée dans le json
import data from "@/assets/data/data.json";
import type { TTask } from "~/@types/todo";
import { writeTasksData } from "#imports";

// initialisation d'un store contenant les donnée disponible dans le reste de l'app

const taskList = useState<TTask[]>("list", () => data);
const isDrag = ref(false);
const onEnd = () => {
  writeTasksData(taskList.value);
  isDrag.value = false;
};

const onStart = () => {
  isDrag.value = true;
};
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div v-if="taskList.length === 0">No task yet !</div>
    <draggable
      v-model="taskList"
      item-key="id"
      class="w-full flex flex-col justify-center items-center gap-10"
      @end="onEnd"
      @start="onStart"
    >
      <template #item="{ element, index }">
        <div class="shadow-md bg-yellow-50 min-w-full rounded-l-3xl">
          <TaskCard
            :task="element"
            :index="index"
            :class="{ 'drop-shadow-[0_0_0.15rem_crimson]': isDrag }"
          />
        </div>
      </template>
    </draggable>
  </div>
</template>
