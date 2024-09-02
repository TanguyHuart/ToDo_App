export type TTask = {
  id: string;
  label: string;
  subtasks: TTask[] | null;
};
