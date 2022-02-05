import { createAuthSlice } from "@store/tools/createAuthSlice";
import initialSchema from "@common/initial-schema"

const initialState = {
  schema: initialSchema
};

const authSlice = createAuthSlice({
  name: "auth",
  initialState,
  reducers: {
    tokenAdded(state, action) {
      state.token = action.payload;
    },
    tokenRemoved(state) {
      state.token = null;
    },
    authRemoved(state) {
      state.token = null;
      state.user = null;
    },
    userAdded(state, action) {
      state.user = action.payload;
    },
  },
});

export const { tokenAdded, tokenRemoved, authRemoved, userAdded } =
  authSlice.actions;

export default authSlice.reducer;
