import store from "@store/index";

const useBatchDispatch = () => {
  return (actionType, payloads) => {
    const storeState = store.getState();
    for (var slice in storeState) {
      const payload = payloads ? payloads[slice] : undefined;
      store.dispatch({ type: `${slice}/${actionType}`, payload });
    }
  };
};
export default useBatchDispatch;
