const w: any = window;
export const requestAnimationFrame =
  w?.requestAnimationFrame ||
  w?.webkitRequestAnimationFrame ||
  w?.mozRequestAnimationFrame ||
  function (callback) {
    setTimeout(callback, 1000 / 60);
  };
