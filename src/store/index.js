import { configureStore } from "@reduxjs/toolkit";
import { loadState } from "@utils/localStorage";

import { TOKEN_ID } from "@common/constants";

import settingsReducer from "@store/slices/settings";
import sourcesReducer from "@store/slices/sources";
import referenceReducer from "@store/slices/reference";

export default configureStore({
  reducer: {
    settings: settingsReducer,
    sources: sourcesReducer,
    reference: referenceReducer,
  },
  preloadedState: loadState({ key: TOKEN_ID, strict: true }),
});
