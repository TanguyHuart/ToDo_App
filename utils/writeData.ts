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
  if (result.success) {
    console.log("Data saved !!!!");
  } else {
    console.error("Error to save data");
  }
};
