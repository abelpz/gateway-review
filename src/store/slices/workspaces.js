import { createAuthSlice } from "@store/tools/createAuthSlice";


const initialState = {
  current: 0,
  list: [
    {
      id: "obs-all",
      name: "All",
      cards: ["obs", "obs-tn", "ta", "tw", "obs-tq", "obs-twl"],
      layout: {
        lg: [
          { w: 3, h: 8, x: 0, y: 0, i: "0" },
          { w: 3, h: 8, x: 3, y: 0, i: "1" },
          { w: 3, h: 8, x: 6, y: 0, i: "2" },
          { w: 3, h: 8, x: 9, y: 0, i: "3" },
          { w: 9, h: 3, x: 0, y: 8, i: "4" },
          { w: 3, h: 3, x: 9, y: 8, i: "5" },
        ],
      },
    },
    {
      id: "obs-notes",
      name: "tNotes",
      cards: ["obs", "obs-tn", "ta"],
      layout: {
        lg: [
          { w: 4, h: 11, x: 0, y: 0, i: "0" },
          { w: 4, h: 11, x: 4, y: 0, i: "1" },
          { w: 4, h: 11, x: 8, y: 0, i: "2" },
        ],
      },
    },
    {
      id: "obs-words",
      name: "tWords",
      cards: ["obs", "tw", "obs-twl"],
      layout: {
        lg: [
          { w: 6, h: 11, x: 0, y: 0, i: "0" },
          { w: 6, h: 8, x: 6, y: 0, i: "1" },
          { w: 6, h: 3, x: 6, y: 8, i: "2" },
        ],
      },
    },
    {
      id: "obs-tq",
      name: "tQuestions",
      cards: ["obs", "obs-tq"],
      layout: {
        lg: [
          { w: 6, h: 11, x: 0, y: 0, i: "0" },
          { w: 6, h: 11, x: 6, y: 0, i: "1" },
        ],
      },
    },
  ],
};

const workspacesSlice = createAuthSlice({
  name: "workspaces",
  initialState,
  reducers: {
    workspaceAdded(state, action) {
      state.list.push(action.payload);
    },
    workspaceRemoved(state, action) {
      state.list.pop(action.payload);
    },
    currentChanged(state, action) {
      state.current = action.payload;
    },
    layoutSet(state, action) {
      const workspaceId = action.payload.id;
      const layout = action.payload.layout;
      state.list =
        workspaceId && layout
          ? state.list.map((workspace) =>
              workspace.id === workspaceId
                ? { ...workspace, layout: layout }
                : workspace
            )
          : state.list;
    },
  },
});

export const { workspaceAdded, workspaceRemoved, layoutSet, currentChanged } =
  workspacesSlice.actions;

export default workspacesSlice.reducer;