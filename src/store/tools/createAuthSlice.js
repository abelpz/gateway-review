const { createSlice } = require("@reduxjs/toolkit");

export const createAuthSlice = (options) => {
  const newOptions = {
    ...options,
    reducers: {
      reset(state) {
        return options.initialState;
      },
      set(state, action) {
        if (action.payload) return action.payload;
      },
      ...options.reducers,
    },
  };
  return createSlice(newOptions);
};
