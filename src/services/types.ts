export type EmployeeId = {
  id: number;
};

export type Task = {
  id?: number;
  state: string;
  name: string;
  description: string;
  project: {
    id: number;
    name: string;
  };
  initial_date: string;
  final_date: string;
  estimated_hours: number;
  assigned_employee: EmployeeId;
  collaborators: EmployeeId[];
};

export type Project = {
  id?: number;
  state: string;
  name: string;
  initial_date: string;
  final_date: string;
  description: string;
  tasks?: Task[];
  collaborators_amount?: number;
  tasks_amount?: number;
};

export type Options = {
  id?: number;
  name: string;
};

export type Employee = {
  id: number;
  name: string;
  lastname: string;
};

export type OptionsRegistros = {
  id_registro_horas?: number;
  nombre_proyecto: string;
  nombre_tarea: string;
  nombre_recurso: string;
};

export type RegistroDeHoras = {
  id_registro_horas?: number;
  nombre_proyecto: string;
  nombre_tarea: string;
  nombre_recurso: string;
  cantidad: number;
  fecha_trabajada: Date;
  id_proyecto: number,
  id_tarea: number,
  id_recurso: number,
};

export type Registro = {
  nombre_proyecto: string;
  nombre_tarea: string;
  nombre_recurso: string;
  id_proyecto: string;
  id_tarea: string;
  id_recurso: string;
  cantidad: number;
  fecha_trabajada: Date;
};

export type Recurso = {
  id?: number;
  name: string;
  lastname: string;
};
