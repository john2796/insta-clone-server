export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined; // returned null if there's no data name state in localstorage
    }
    return JSON.parse(serializedState); // parse is as json format if there is data
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState); // save data to localstorage
  } catch (err) {
    console.log(err);
  }
};
