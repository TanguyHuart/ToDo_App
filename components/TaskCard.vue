<script setup lang="ts">
import { useState } from "#app";
import { ref } from "vue";
import { type TTask } from "@/@types/todo";
import { modifyTask } from "~/utils/taskFunction";

defineProps<{ task: TTask }>();

const taskList = useState<TTask[]>("list");
// const taskDone = ref(false);
const modalIsVisible = ref(false);

const checkTaskAreDone = (task: TTask) => {
  const subTaskDone = task.subtasks?.map((element) => element.isDone);
  const allTrue = subTaskDone.every((bol) => bol === true);

  if (allTrue) {
    task.isDone = true;
    modifyTask(taskList.value, taskList.value, task);
  } else {
    task.isDone = false;
  }
};

// Au clic , check si il y a des sous taches , si oui , appel la fonction checkTaskAreDone qui va vérifié recursivement si les sous taches sont complétée ou pas .
const toogleTask = (task: TTask) => {
  if (task.subtasks?.length > 0) {
    checkTaskAreDone(task);
  } else {
    task.isDone = !task.isDone;
    modifyTask(taskList.value, taskList.value, task);
  }
};

const closeModal = () => {
  modalIsVisible.value = false;
};
</script>

<template>
  <div
    :datatype-id="task.id"
    class="w-full bg-blue-50 p-4 border border-neutral-500 rounded-xl flex flex-col gap-4"
  >
    <div class="flex justify-between gap-4">
      <h2 :class="{ 'line-through': task.isDone }">{{ task.label }}</h2>
      <div class="flex gap-2">
        <button
          class="h-10 bg-green-500 rounded-lg p-2"
          @click="toogleTask(task)"
        >
          Done
        </button>
        <button
          class="h-10 bg-neutral-300 rounded-lg p-2"
          @click="modalIsVisible = true"
        >
          Menu
        </button>
      </div>
    </div>

    <div
      v-if="task.subtasks && task.subtasks?.length > 0"
      class="flex flex-col items-center w-full gap-4"
    >
      <TaskCard
        v-for="sustask of task.subtasks"
        :key="sustask.id"
        :task="sustask"
      />
    </div>
    <TaskModal
      v-if="modalIsVisible"
      :is-visible="modalIsVisible"
      :task="task"
      @close-modal="closeModal"
    />
  </div>
</template>
