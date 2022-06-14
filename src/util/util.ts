export const zeroPad = (num: number, places: number = 3) => {
  let zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
};
