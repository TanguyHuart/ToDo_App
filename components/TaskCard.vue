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
    modifyTaskFunction(taskList.value, taskList.value, task);
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
    modifyTaskFunction(taskList.value, taskList.value, task);
  }
};

// fonction qui permet de fermer la modale de gestion de tâche
const closeModal = () => {
  modalIsVisible.value = false;
};

// fonction de fin drag/drop qui permet d'ecrire le nouveau positionnement dans le json.
const onEnd = () => {
  writeTasksData(taskList.value);
};
</script>

<template>
  <div
    :datatype-id="task.id"
    class="w-full p-4 pb-0 pr-0 flex flex-col border-t-4"
    :class="{ 'bg-green-200': task.isDone, 'bg-yellow-50': !task.isDone }"
  >
    <div class="flex justify-between gap-4 py-2">
      <h2 :class="{ 'line-through': task.isDone }">{{ task.label }}</h2>
      <div class="flex gap-2 pb-2 pr-2">
        <button
          v-if="!task.isDone"
          class="h-10 bg-green-500 rounded-lg p-2"
          @click="toogleTask(task)"
        >
          Done
        </button>
        <button
          v-if="task.isDone"
          class="h-10 bg-red-500 rounded-lg p-2"
          @click="toogleTask(task)"
        >
          Undo
        </button>
        <button
          class="h-10 bg-blue-300 rounded-lg p-2"
          @click="modalIsVisible = true"
        >
          Menu
        </button>
      </div>
    </div>

    <div
      v-if="task.subtasks && task.subtasks?.length > 0"
      class="flex flex-col items-center w-full border-l border-dotted border-neutral-500"
    >
      <draggable
        v-model="localTask.subtasks"
        item-key="id"
        class="flex flex-col items-center w-full border-l border-dotted border-neutral-500"
        @end="onEnd"
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

    <TaskModal
      v-if="modalIsVisible"
      :is-visible="modalIsVisible"
      :task="task"
      @close-modal="closeModal"
    />
  </div>
</template>
