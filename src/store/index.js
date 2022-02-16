import { configureStore } from "@reduxjs/toolkit";
import { loadState } from "@utils/localStorage";

import { TOKEN_ID } from "@common/constants";

import referenceReducer from "@store/slices/reference";
import settingsReducer from "@store/slices/settings";
import sourcesReducer from "@store/slices/sources";
import workspacesReducer from "@store/slices/workspaces";

export default configureStore({
  reducer: {
    settings: settingsReducer,
    sources: sourcesReducer,
    reference: referenceReducer,
    workspaces: workspacesReducer,
  },
  preloadedState: loadState({ key: TOKEN_ID, strict: true }),
});
