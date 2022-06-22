import { NextRouter } from 'next/router';

export const zeroPad = (num: number, places: number = 3) => {
  let zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
};

export const routeToProject = (id : number | null, router : NextRouter) => {
  if (!id) return;
  router.push("/projects/project?id=" + id);
}

export const dateDiff = (date1: Date, date2: Date) => {
  const diff = date1.getTime() - date2.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

export const pluralize = (noun: string, count?: number, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;