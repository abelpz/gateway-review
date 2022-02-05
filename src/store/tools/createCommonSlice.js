const { createSlice } = require("@reduxjs/toolkit");

export const createCommonSlice = (options, actions) => {
  const newOptions = {
    reducers: {
      ...options.reducers,
      ...actions,
    },
    ...options,
  };
  return createSlice(newOptions);
};
