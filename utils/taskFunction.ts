import type { TTask } from "~/@types/todo";

export const modifyTask = (
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

      console.log(tasks);

      writeTasksData(taskList);
      return true;
    }
    if (task.subtasks && modifyTask(taskList, task.subtasks, modifiedTask)) {
      return true;
    }
  }

  return false;
};
