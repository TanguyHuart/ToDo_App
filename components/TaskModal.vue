<script setup lang="ts">
import { useState } from "#app";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import type { TTask } from "~/@types/todo";
import { writeTasksData, modifyTaskFunction } from "~/utils/writeData";

defineProps<{ task: TTask; isVisible: boolean }>();

const taskList = useState<TTask[]>("list");
const taskCreated = useState("taskCreated");
const addFormIsVisible = ref<boolean>(false);
const modifyFormIsVisible = ref<boolean>(false);
const addInput = ref<string>("");
const modifyInput = ref<string>("");

// emit défini un evenement qui se passe dans le composant pour l'envoyer au prent qui va le receptionner. quand la fonction closeModale est effectuée dans ce composant , emit est lancé
// et le composant parent va lui meme lancer sa propre fonction.

const emit = defineEmits(["close-modal"]);

const closeModale = () => {
  emit("close-modal");
};

// pour la fonction d'ajout , on génère l'id sous la forme uuid en prenant le parents comme argument et on push dans subtask
// puis on écrit dans le JSON via la fonction writeTaskData

const addNewSubTask = (
  parentTask: TTask,
  subTaskLabel: string,
  index: number,
): TTask => {
  const newSubTask: TTask = {
    id: uuidv4(),
    label: subTaskLabel,
    subtasks: [],
    isDone: false,
    // index: parentTask.subtasks.length + 1,
  };
  parentTask.subtasks?.splice(index, 0, newSubTask);
  writeTasksData(taskList.value);
  taskCreated.value = true;
  closeModale();
  return newSubTask;
};

// pour la fonction de suppression, il faut parcourir le tableau de taches trouver la tache ayant le bon id et la supprimer de l'array subtask de son parent. boucle for.
// puis on écrit sur le json le tableau modifié

const deleteTask = (tasks: TTask[], id: string) => {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.id === id) {
      tasks.splice(i, 1);
      // organizeIndex(tasks);
      writeTasksData(taskList.value);
      closeModale();
      return true;
    }
    if (task.subtasks && deleteTask(task.subtasks, id)) {
      return true;
    }
  }
  closeModale();
  return false;
};

// pour la fonction de modification , trouver la tache en parcourant le tableau et modifier ses propriété

const handleModifyTaskEvent = (task: TTask) => {
  task.label = modifyInput.value;

  modifyTaskFunction(taskList.value, taskList.value, task);
  closeModale();
};
</script>

<template>
  <div
    class="z-40 shadow-md shadow-black bg-white rounded fixed top-1/2 left-1/2 -translate-x-1/2 p-4 flex flex-col gap-4 w-11/12 min-h-48"
  >
    <button
      class="absolute top-0 right-0 font-bold p-2 bg-red-400 transition-all hover:bg-red-500 border-b border-l w-10 h-10"
      @click="closeModale"
    >
      X
    </button>
    <div class="flex flex-col gap-4">
      <p
        class="text-center text-xl border-b border-neutral-300 pb-4 font-indie font-bold tracking-wider"
      >
        {{ task.label }}
      </p>
      <div class="flex flex-wrap gap-4 justify-evenly">
        <button
          class="border bg-red-400 rounded-xl p-4 min-w-32 hover:bg-red-500 transition-all"
          @click="deleteTask(taskList, task.id)"
        >
          Delete
        </button>
        <button
          class="border bg-amber-100 rounded-xl p-4 min-w-32 hover:bg-amber-400 transition-all"
          @click="
            modifyFormIsVisible = !modifyFormIsVisible;
            addFormIsVisible = false;
          "
        >
          Modify
        </button>
        <button
          class="border rounded-xl bg-blue-200 hover:bg-blue-300 p-4 min-w-32 transition-all"
          @click="
            addFormIsVisible = !addFormIsVisible;
            modifyFormIsVisible = false;
          "
        >
          Add subtask
        </button>
      </div>
    </div>
    <div v-if="addFormIsVisible" class="flex flex-col items-center w-full">
      <label for="addinput">Add subtask :</label>
      <div class="flex gap-4 items-center w-full justify-center">
        <input
          id="addinput"
          v-model="addInput"
          type="text"
          placeholder="Please enter your text here"
          class="border border-black rounded p-2 focus:border-2 h-10 w-1/2"
        />
        <div v-if="addInput">
          <p>Witch position ?</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="subtask of task.subtasks"
              :key="subtask.id"
              class="bg-green-500 p-2 border rounded w-10"
              @click="
                addNewSubTask(task, addInput, task.subtasks.indexOf(subtask))
              "
            >
              {{ task.subtasks.indexOf(subtask) + 1 }}
            </button>
            <button
              class="bg-green-500 p-2 border rounded w-10"
              @click="addNewSubTask(task, addInput, task.subtasks.length)"
            >
              {{ task.subtasks.length + 1 }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="modifyFormIsVisible" class="flex flex-col items-center w-full">
      <label for="modifyinput">Modify task :</label>
      <div class="flex gap-4 w-full justify-center">
        <input
          id="modifyinput"
          v-model="modifyInput"
          type="text"
          :placeholder="task.label"
          class="border border-black rounded p-2 focus:border-2 w-1/2"
        />
        <button
          v-if="modifyInput"
          class="bg-green-500 p-2 border rounded"
          @click="handleModifyTaskEvent(task)"
        >
          OK !
        </button>
      </div>
    </div>
  </div>
</template>
