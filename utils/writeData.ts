import type { TTask } from "~/@types/todo";

// fonction qui fait appel a la route api pour avoir acceès au fileSystem et pouvoir écrire que le JSON . route post avec commme body le nouveau tableau de tache a écrire sur le fichier.
export const writeTasksData = async (data: TTask[]) => {
  const res = await fetch("/api/write-file", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!result.success) {
    return new Error("Error for save data , please retry");
  }
};

// fonction de modification de la tâche
// boucle sur tes tâche et les subtaches s'il y en a pour trouver l'id qui correspond a la tache modifiée .
// modifie la tache dans l tableaud e référence puis fait appel a la fonction écrire le tableau dans le json.
// tasklist correspond a la liste globale qui est conte u dans le json , on y touche que lors de la sauvegarde des modifications.
// tasks correspond a la liste globale mais qui va etre modifiée par l'opération
export const modifyTaskFunction = (
  taskList: TTask[],
  tasks: TTask[],
  modifiedTask: TTask,
) => {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.id === modifiedTask.id) {
      task.label = modifiedTask.label;
      task.subtasks = modifiedTask.subtasks;
      task.isDone = modifiedTask.isDone;
      writeTasksData(taskList);
      return true;
    }
    if (
      task.subtasks &&
      modifyTaskFunction(taskList, task.subtasks, modifiedTask)
    ) {
      return true;
    }
  }
  return false;
};
