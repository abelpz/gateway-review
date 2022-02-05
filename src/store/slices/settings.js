import { createAuthSlice } from "@store/tools/createAuthSlice";


const initialState = {
  options: { saveToken: false },
  org: null,
  user: null,
  auth: null,
};

const settingsSlice = createAuthSlice({
  name: "settings",
  initialState,
  reducers: {
    settingsAdded(state, action) {
      return action.payload;
    },
    optionsAdded(state, action) {
      state.options = action.payload;
    },
    orgAdded(state, action) {
      state.org = action.payload;
    },
    userAdded(state, action) {
      state.user = action.payload;
    },
    authAdded(state, action) {
      state.auth = action.payload;
    },
    authRemoved(state) {
      state.auth = null;
    },
    loggedOut(state) {
      state.options.saveToken = false;
    },
  },
});

export default settingsSlice.reducer;

export const {
  settingsAdded,
  optionsAdded,
  orgAdded,
  userAdded,
  authAdded,
  authRemoved,
  loggedOut,
} = settingsSlice.actions;