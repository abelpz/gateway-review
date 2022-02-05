import { useDispatch, useSelector } from "react-redux";

import { orgAdded } from "@store/slices/settings";
import { orgAdded as sourceOrgAdded } from "@store/slices/sources";

const useAppOrg = () => {
  const dispatch = useDispatch();
  const org = useSelector((state) => state.settings.org);

  const setOrg = (org) => {
    dispatch(orgAdded(org));
    dispatch(sourceOrgAdded(org));
  };
  return [org, setOrg];
};

export default useAppOrg;
