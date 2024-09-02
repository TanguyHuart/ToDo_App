export type TTask = {
  // l'id est un string car on va le définir sur le style 1.1.2 par exemple
  id: string;
  label: string;
  subtasks: TTask[] | null;
};
