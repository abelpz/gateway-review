import { createAuthSlice } from "@store/tools/createAuthSlice";

const initialState = {
  story: "1",
  frame: "0",
  note: {},
  word: {},
  question: {},
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
    noteChanged(state, action) {
      console.log("noteChanged");
      state.note = action.payload;
    },
    wordChanged(state, action) {
      state.word = action.payload;
    },
    questionChanged(state, action) {
      state.question = action.payload;
    },
  },
});

export const { storyChanged, frameChanged, noteChanged, wordChanged } =
  referenceSlice.actions;

export default referenceSlice.reducer;
