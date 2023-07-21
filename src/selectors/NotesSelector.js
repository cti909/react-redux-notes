import { createSelector } from "@reduxjs/toolkit";

// export const searchTextSelector = (state) => state.filters.search;
// export const filterStatusSelector = (state) => state.filters.status;
// export const filterPrioritiesSelector = (state) => state.filters.priorities;
console.log("selector note");

export const NotesSelector = (state) => {
  console.log("tree state/notes:",state.notes);
  return state.notes;
};

