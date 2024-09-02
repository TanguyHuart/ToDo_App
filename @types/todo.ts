export type TTask = {
  id: number;
  label: string;
  subtasks: TTask[] | null;
};
