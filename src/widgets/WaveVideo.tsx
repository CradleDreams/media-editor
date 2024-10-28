import WavesurferPlayer from '@wavesurfer/react'
import React from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../entities/store';
import { updateTime } from '../entities/slices/videoSlice';

export default function WaveVideo({src, handlePlay, handlePause, onReady, waveWidth}: any) {
    const dispatch = useDispatch<AppDispatch>();
    
  return (
    <WavesurferPlayer
        height={100}
        // width={50 * waveWidth}
        waveColor="violet"
        url={src}
        onInteraction={(e, time) => dispatch(updateTime({time}))}
        onReady={onReady}
        onPlay={() => handlePlay}
        onPause={() => handlePause}
      />
  )
}
