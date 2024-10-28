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
  time: number
}
const initialState: IVideoSlice = {
  videos: [],
  time: 0
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
    updateTime: (state, action: PayloadAction<Pick<IVideoSlice, 'time'>>) => {
      state.time = action.payload.time;
    }
  },
});
export const { createVideo, updateVideo, updateTime} = videoSlice.actions;
export const videoReducer =  videoSlice.reducer;
