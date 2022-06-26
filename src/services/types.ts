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

export type Options = {
  id?: number;
  name: string;
  nombre_tarea?: string;
  nombre_recurso?: string;
};

export type OptionsRegistros = {
  codigo_carga?: number;
  nombre_proyecto: string;
  nombre_tarea?: string;
  nombre_recurso?: string;
};

export type RegistroDeHoras = {
  codigo_carga: number;
  nombre_proyecto: string;
  nombre_tarea: string;
  nombre_recurso: string;
  cantidad: number;
  fecha_trabajada: Date;
};

export type Recurso = {
  legajo: number;
  nombre: string;
  apellido: string;
};
