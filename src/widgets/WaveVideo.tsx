import WavesurferPlayer from "@wavesurfer/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../entities/store";
import { updateTime } from "../entities/slices/videoSlice";


interface IWaveVideoProps {
  src: string;
  handlePlay: () => void;
  handlePause: () => void;
  onReady: (ws: any) => void;
  waveWidth: number;
}
export default function WaveVideo({
  src,
  handlePlay,
  handlePause,
  onReady,
  waveWidth,
}: IWaveVideoProps) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <WavesurferPlayer
      height={100}
      width={50 * waveWidth}
      waveColor="violet"
      url={src}
      onInteraction={(e, time) => {
        dispatch(updateTime({ time }));
        handlePause();
      }}
      onReady={onReady}
      onPlay={() => handlePlay}
      onPause={() => handlePause}
    />
  );
}
