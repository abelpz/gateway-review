export default function useLocalStorage() {
  function loadState(key, user) {
    try {
      const lastUser = localStorage.getItem(key + "_lastuser");
      if (!lastUser && !user) return;
      const serializedState = localStorage.getItem(
        key + "_" + (user || lastUser)
      );
      if (!serializedState) return undefined;
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  }
  async function saveState(key, state) {
    try {
      const username = state?.auth?.user?.username;
      if (!username) return;
      const serializedState = JSON.stringify(state);
      const userStateKey = key + "_" + username;
      const lastUserKey = key + "_lastuser";
      localStorage.setItem(lastUserKey, username);
      localStorage.setItem(userStateKey, serializedState);
    } catch (e) {
      // Ignore
    }
  }

  return [saveState, loadState];
}
