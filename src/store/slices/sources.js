import { createAuthSlice } from "@store/tools/createAuthSlice";


const initialState = {
  orgs: [],
  resources: [],
  labels: [],
  issues: [],
  milestones: [],
};

const orgSlice = createAuthSlice({
  name: "sources",
  initialState,
  reducers: {
    orgAdded(state, action) {
      const isFound = state.orgs.some((org) => org.id === action.payload?.id);
      if (isFound) return;
      state.orgs.push(action.payload);
    },
    resourceAdded(state, action) {
      const isFound = state.resources.some(
        (resource) => resource.id === action.payload?.id
      );
      if (isFound) return;
      state.resources.push(action.payload);
    },
    resourcesUpdated(state, action) {
      state.resources = action.payload;
    },
    resourceRemoved(state, action) {
      const resource = action.payload;
      state.resources = state.resources.filter(
        (savedResource) => savedResource.id !== resource.id
      );
    },
  },
});

export default orgSlice.reducer;

export const { orgAdded, resourceAdded, resourcesUpdated, resourceRemoved } =
  orgSlice.actions;