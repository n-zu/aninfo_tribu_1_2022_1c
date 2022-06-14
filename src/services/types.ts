export type Task = {
  id?: number;
  name: string;
  description: string;
  initial_date: string;
  final_date: string;
  estimated_hours: number;
};

export type Project = {
  id?: number;
  name: string;
  initial_date: string;
  final_date: string;
  estimated_hours: number;
  tasks?: Task[];
};
