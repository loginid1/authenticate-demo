export const delay = async function (timer=4000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timer);
  });
};
