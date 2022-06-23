export type EmployeeId = {
  id: number;
}

export type Task = {
  id?: number;
  name: string;
  description: string;
  initial_date: string;
  final_date: string;
  estimated_hours: number;
  assigned_employee: EmployeeId;
  collaborators: EmployeeId[];
};

export type Project = {
  id?: number;
  name: string;
  initial_date: string;
  final_date: string;
  description: string;
  tasks?: Task[];
};

export type Options = {
  id?: number;
  name: string;
}
