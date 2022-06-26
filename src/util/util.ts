import { NextRouter } from 'next/router';

export const zeroPad = (num: number, places: number = 3) => {
  let zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
};

export const routeToProject = (id : number | null, router : NextRouter) => {
  if (!id) return;
  router.push("/projects/project?id=" + id);
}

export const routeToRegistro = (id : number | null, router : NextRouter) => {
  if (!id) return;
  router.push("/rrhh/registro?id=" + id);
}