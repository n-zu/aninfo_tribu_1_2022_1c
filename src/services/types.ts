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
}

// export type OptionsRegistro = {
//   codigo_carga?: number;
//   nombre_proyecto: string;
//   nombre_tarea: string;
//   nombre_recurso: string;
// }

export type RegistroDeHoras = {
  name: string;
  // nombre_proyecto: string;
  nombre_tarea: string;
  nombre_recurso: string;
  cantidad: number;
  fecha_trabajada: Date;
  // codigo_carga?: number;
  id?: number;
}
