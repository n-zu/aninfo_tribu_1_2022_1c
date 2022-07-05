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
  employees: number[]; //TODO: revisar
  tasks: number[];
  creationDate: string; // datetime
  deadline: string; // datetime
  lastEditionDate: string; // datetime
  clientId: number;
};

// Employees

export type Employee = {
  id: number;
  name: string;
}