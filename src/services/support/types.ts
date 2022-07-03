import type { Dayjs } from "dayjs";

// Products

export type ProductVersion = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  versions: ProductVersion[];
};

// Tickets

export type State = "Abierto" | "Cerrado"

export type Ticket = {
  id: number;
  state: State;
  title: string;
  description: string;
  severity: string;
  priority: string;
  responsible: number[]; //TODO: revisar
  creationDate: string; // datetime
  deadline: string; // datetime
  lastEditionDate: string; // datetime
};
