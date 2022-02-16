import { useDispatch, useSelector } from "react-redux";

import {
  currentChanged,
  workspaceAdded,
  workspaceRemoved,
} from "@store/slices/workspaces";

export default function useWorkspaces() {
  const dispatch = useDispatch();

  const [workspaces, current] = useSelector(({ workspaces }) => [
    workspaces.list,
    workspaces.current,
  ]);
  const addWorkspace = (workspace) => dispatch(workspaceAdded(workspace));
  const removeWorkspace = (workspace) => dispatch(workspaceRemoved(workspace));

  const setCurrent = (current) => dispatch(currentChanged(current));

  return { workspaces, current, setCurrent, addWorkspace, removeWorkspace };
}
