import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IVideo {
  id: string;
  src: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  duration?: number;
}
interface IVideoSlice {
  videos: IVideo[];
}
const initialState: IVideoSlice = {
  videos: [],
};

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    createVideo: (state, action: PayloadAction<IVideo>) => {
      state.videos.push(action.payload);
    },
    updateVideo: (state, action: PayloadAction<IVideo>) => {
      const index = state.videos.findIndex(video => video.id === action.payload.id);
      if (index !== -1) {
        state.videos[index] = {
          ...state.videos[index],
          ...action.payload,
        };
      }
    },
  },
});
export const { createVideo, updateVideo} = videoSlice.actions;
export const videoReducer =  videoSlice.reducer;
