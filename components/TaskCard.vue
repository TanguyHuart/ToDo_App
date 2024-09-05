<script setup lang="ts">
import { useState } from "#app";
import { ref } from "vue";
import draggable from "vuedraggable";
import { modifyTaskFunction, writeTasksData } from "~/utils/writeData";
import { type TTask } from "@/@types/todo";

const props = defineProps<{ task: TTask }>();

const taskList = useState<TTask[]>("list");
// const taskDone = ref(false);
const modalIsVisible = ref(false);
const localTask = ref<TTask>(props.task);
const isDrag = ref(false);

// creation d'un evenement vers le parents losque que on check une task
const emit = defineEmits(["task-checked"]);

const taskChecked = (task: TTask) => {
  checkTaskAreDone(task);
};

// fonction qui permet de checker si les enfant et parents ont bien leur tache completes, couplée a l'émission de l'evenement emit , permet de faire une boucle vers tous les parents successifs.
// cree un tableau de tous les booléen check et renvoie false si un check est false.
const checkTaskAreDone = (task: TTask) => {
  const subTaskDone = task.subtasks?.map((element) => element.isDone);
  const allTrue = subTaskDone.every((bol) => bol === true);

  if (allTrue) {
    task.isDone = true;

    emit("task-checked");
  } else {
    task.isDone = false;
    emit("task-checked");
  }
};

// Au clic , check si il y a des sous taches , si oui , appel la fonction checkTaskAreDone qui va vérifié recursivement si les sous taches sont complétée ou pas .

const toogleTask = (task: TTask) => {
  if (task.subtasks?.length > 0) {
    checkTaskAreDone(task);
  } else {
    task.isDone = !task.isDone;
    emit("task-checked");
  }
  modifyTaskFunction(taskList.value, taskList.value, task);
};

// fonction qui permet de fermer la modale de gestion de tâche
const closeModal = () => {
  modalIsVisible.value = false;
};

// fonction de fin drag/drop qui permet d'ecrire le nouveau positionnement dans le json.
const onEnd = () => {
  writeTasksData(taskList.value);
  isDrag.value = false;
};

const onStart = () => {
  isDrag.value = true;
};
</script>

<template>
  <div
    :datatype-id="task.id"
    class="w-full relative pr-0 flex hover:cursor-grab rounded-l-2xl shadow-md border-amber-500 transition-all hover:shadow-black"
  >
    <div class="bg-neutral-200 py-2 rounded-l-3xl">
      <img src="/icons/drag.png" alt="drag-icon" class="w-4" />
    </div>
    <div
      class="w-full pl-4 py-2"
      :class="{ 'bg-green-200': task.isDone, 'bg-yellow-50': !task.isDone }"
    >
      <div class="flex justify-between items-center gap-4 py-2">
        <h2
          class="font-hand font-medium text-xl"
          :class="{ 'line-through': task.isDone }"
        >
          {{ task.label }}
        </h2>
        <div class="flex gap-2 pr-2 items-center">
          <button
            class="relative h-6 w-6 border-2 rounded-lg p-2 transition-all hover:border-black"
            @click="toogleTask(task)"
          >
            <img
              v-if="task.isDone"
              src="/icons/check.png"
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              alt="check-icon"
            />
          </button>

          <button
            class="rounded-lg transition-all w-8 hover:scale-[1.1]"
            @click="modalIsVisible = true"
          >
            <img src="/icons/menu.png" alt="menu-icon" />
          </button>
        </div>
      </div>

      <div
        v-if="task.subtasks && task.subtasks?.length > 0"
        class="flex flex-col items-center w-full border-neutral-300 rounded-l-3xl pt-2"
      >
        <draggable
          v-model="localTask.subtasks"
          item-key="id"
          class="flex flex-col items-center w-full gap-4"
          :class="{ 'drop-shadow-[0_0_0.15rem_orange]': isDrag }"
          @end="onEnd"
          @start="onStart"
        >
          <template #item="{ element, index }">
            <TaskCard
              :task="element"
              :index="index"
              @task-checked="taskChecked(task)"
            />
          </template>
        </draggable>
      </div>
    </div>

    <TaskModal
      v-if="modalIsVisible"
      :is-visible="modalIsVisible"
      :task="task"
      @close-modal="closeModal"
    />
  </div>
</template>
