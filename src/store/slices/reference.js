import { createAuthSlice } from "@store/tools/createAuthSlice";

const initialState = {
  story: 1,
  frame: 0,
};

const referenceSlice = createAuthSlice({
  name: "reference",
  initialState,
  reducers: {
    storyChanged(state, action) {
      state.story = action.payload;
    },
    frameChanged(state, action) {
      state.frame = action.payload;
    },
  },
});

export const { storyChanged, frameChanged } = referenceSlice.actions;

export default referenceSlice.reducer;
