import { log } from 'console';
import React, { RefObject } from 'react'

interface IButtonSetting{
    text: string,
    ref: any,
}
const ButtonVideo: React.FC<IButtonSetting> = (props) => {
 
  
    const handleStart = () => {
      console.log(props.ref);
        // if (props.ref?.current) {
        //     props.ref.current.play();
        //   }
        };
//   const handlePause = () => {
//     props.ref?.pause()
//   }
  return (
    <button onClick={handleStart}>{props.text}</button>
  )
}

export default ButtonVideo;
