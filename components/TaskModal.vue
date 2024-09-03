<script setup lang="ts">
import { useState } from "#app";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import type { TTask } from "~/@types/todo";
import { writeTasksData } from "~/utils/writeData";
import { modifyTask } from "~/utils/taskFunction";

defineProps<{ task: TTask; isVisible: boolean }>();

const taskList = useState<TTask[]>("list");
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

const addNewSubTask = (parentTask: TTask, subTaskLabel: string): TTask => {
  const newSubTask: TTask = {
    id: uuidv4(),
    label: subTaskLabel,
    subtasks: [],
    isDone: false,
    // index: parentTask.subtasks.length + 1,
  };
  parentTask.subtasks?.push(newSubTask);
  writeTasksData(taskList.value);
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

  modifyTask(taskList.value, taskList.value, task);
  closeModale();
};
</script>

<template>
  <div
    class="border bg-white rounded fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 flex flex-col gap-4"
  >
    <button class="absolute top-0 right-0 font-bold p-2" @click="closeModale">
      X
    </button>
    <div class="flex flex-col gap-4">
      <p>{{ task.label }}</p>
      <div class="flex gap-4">
        <button
          class="w-20 bg-red-500 px-2"
          @click="deleteTask(taskList, task.id)"
        >
          X
        </button>
        <button
          class="w-20 border px-2"
          @click="modifyFormIsVisible = !modifyFormIsVisible"
        >
          Modifier
        </button>
        <button
          class="w-20 border bg-blue-200 px-2"
          @click="addFormIsVisible = !addFormIsVisible"
        >
          +
        </button>
      </div>
    </div>
    <div v-if="addFormIsVisible">
      <label for="input">Ajouter une sous tâche :</label>
      <div class="flex gap-4">
        <input
          id="input"
          v-model="addInput"
          type="text"
          placeholder="Entrez votre texte ici"
          class="border border-black rounded p-2 focus:border-2"
        />
        <button
          v-if="addInput"
          class="bg-green-500 p-2 border rounded"
          @click="addNewSubTask(task, addInput)"
        >
          OK !
        </button>
      </div>
    </div>
    <div v-if="modifyFormIsVisible">
      <label for="input">Modifier la tâche :</label>
      <div class="flex gap-4">
        <input
          id="input"
          v-model="modifyInput"
          type="text"
          :placeholder="task.label"
          class="border border-black rounded p-2 focus:border-2"
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
