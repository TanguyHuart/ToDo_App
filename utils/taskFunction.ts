// import type { TTask } from "~/@types/todo";

// fonction de modification de la tâche
// boucle sur tes tâche et les subtaches s'il y en a pour trouver l'id qui correspond a la tache modifiée .
// modifie la tache dans l tableaud e référence puis fait appel a la fonction écrire le tableau dans le json.

// const modifyTaskFunction = (
//   taskList: TTask[],
//   tasks: TTask[],
//   modifiedTask: TTask,
// ) => {
//   for (let i = 0; i < tasks.length; i++) {
//     const task = tasks[i];
//     if (task.id === modifiedTask.id) {
//       task.label = modifiedTask.label;
//       task.subtasks = modifiedTask.subtasks;
//       task.isDone = modifiedTask.isDone;
//       writeTasksData(taskList);
//       return true;
//     }
//     if (
//       task.subtasks &&
//       modifyTaskFunction(taskList, task.subtasks, modifiedTask)
//     ) {
//       return true;
//     }
//   }
//   return false;
// };

// export const organizeIndex = (tasks: TTask[]) => {
//   for (let i = 0; i < tasks.length; i++) {
//     tasks[i].index = i + 1;
//   }
// };
