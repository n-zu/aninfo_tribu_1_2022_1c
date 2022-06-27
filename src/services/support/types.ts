import type { Dayjs } from "dayjs";


export enum State {
  ABIERTO,
  CERRADO,
}

export type Ticket = {
  id: number;
  title: string;
  state: State;
  severity: string;
  priority: string;
  responsible: string; //TODO: revisar
  creationDate: Dayjs;
  expirationDate: Dayjs;
  lastEditionDate: Dayjs;
  description: string;
};

export type TicketSummary = Pick<
  Ticket,
  "id" | "title" | "state" | "priority" | "severity" | "expirationDate"
>;
