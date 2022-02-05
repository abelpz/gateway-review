import { useDispatch, useSelector } from "react-redux";

import { authAdded } from "@store/slices/settings";

const useAppAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.settings.auth);

  const setAuth = (auth) => {
    dispatch(authAdded(auth));
  };
  return [auth, setAuth];
};

export default useAppAuth;
