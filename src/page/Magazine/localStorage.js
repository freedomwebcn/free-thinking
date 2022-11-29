export default function () {
  const setItem = (key, data, isStringify = false) => {
    if (isStringify) {
      window.localStorage.setItem(key, JSON.stringify(data));
      return;
    }
    window.localStorage.setItem(key, data);
  };

  const getItem = (key) => {
    return window.localStorage.getItem(key);
  };

  const clearStorage = (key, isClearAll = true) => {
    if (isClearAll) {
      window.localStorage.clear();
      return;
    }
    window.localStorage.clear(key);
  };

  return {
    setItem,
    getItem,
    clearStorage
  };
}
