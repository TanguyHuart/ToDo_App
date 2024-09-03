import type { TTask } from "~/@types/todo";

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
