import WavesurferPlayer from "@wavesurfer/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../entities/store";
import { updateTime } from "../entities/slices/videoSlice";
import { useMemo } from "react";
import Hover from 'wavesurfer.js/dist/plugins/hover.js'

interface IWaveVideoProps {
  src: string;
  handlePlay: () => void;
  handlePause: () => void;
  onReady: (ws: any) => void;
  waveWidth: number;
  selectTimeSlice: (e: any) => void;
  key: number
}
export default function WaveVideo({
  src,
  handlePlay,
  handlePause,
  onReady,
  waveWidth,
  selectTimeSlice,
  key
}: IWaveVideoProps) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
    <WavesurferPlayer
      key={key}
      height={100}
      width={50 * waveWidth}
      waveColor="violet"
      url={src}
      onInteraction={(e, time) => {
        dispatch(updateTime({ time }));
        handlePause();
        selectTimeSlice(e)
      }}
      onReady={onReady}
      onPlay={() => handlePlay}
      onPause={() => handlePause}
      plugins={useMemo(() => [Hover.create({
        lineColor: '#fff',
        lineWidth: 2,
        labelBackground: '#555',
        labelColor: '#fff',
        labelSize: '11px',
      })], [])}
    />
    </>
  );
}
