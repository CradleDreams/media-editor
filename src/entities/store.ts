import { configureStore } from "@reduxjs/toolkit";
import { videoReducer } from "./slices/videoSlice";
import undoable from "redux-undo";

export const store = configureStore({
  reducer: {
    videos: undoable(videoReducer, {limit: 10}),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
