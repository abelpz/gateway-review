import { useDispatch, useSelector } from "react-redux";

import { layoutSet } from "@store/slices/workspaces";

export default function useWorkspace({ workspaceId }) {
  const dispatch = useDispatch();
  const workspace = useSelector(({ workspaces }) => {
    return workspaces.list.find(({ id }) => workspaceId === id) || workspaces[0];
  });
  const layout = workspace.layout;
  const setLayout = (layout) =>
    dispatch(layoutSet({ layout, id: workspaceId }));

  // const addCard = ...
  // const removeCard = ...

  return { workspace, layout, setLayout };
}
