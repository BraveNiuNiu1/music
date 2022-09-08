// 防抖
function debounce(fn, wait = 600) {
  let timeId = null;
  return function(...args) {
    if (timeId) {
      clearTimeout(timeId);
      timeId = null;
    }
    timeId = setTimeout(() => {
      fn(...args);
    }, wait);
  };
}

// 节流
function throttle(fn, wait = 600) {
  let timeId = null;
  return function(...args) {
    if (!timeId) {
      timeId = setTimeout(() => {
        fn(...args);
        timeId = null;
      }, wait);
    }
  };
}

export {
  debounce,
  throttle
};
