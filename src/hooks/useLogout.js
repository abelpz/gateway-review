import { saveState } from "@utils/localStorage";
import { useDispatch } from "react-redux";

import { TOKEN_ID } from "@common/constants";

import store from "@store/index";
import { authRemoved } from "@store/slices/settings";
import { loggedOut } from "@store/slices/settings";

import useBatchDispatch from "./useBatchDispatch";

const useLogout = () => {
  const batchDispatch = useBatchDispatch();
  const dispatch = useDispatch();
  return () => {
    dispatch(authRemoved());
    dispatch(loggedOut());
    saveState(TOKEN_ID, store.getState()).then(batchDispatch("reset"));
  };
};
export default useLogout;
