import {Layer, Stage, Image} from "react-konva";
import { useState } from "react";
import React from "react";
import Konva from "konva";

function App() {
  const [src, setSrc] = useState('')
  const [video, setVideo] = useState<any>()

  const imageRef = React.useRef<any>();
  const [size, setSize] = React.useState({ width: 50, height: 50 });

  const videoElement = React.useMemo(() => {
    const element = document.createElement("video");
    element.src = src;
    return element;
  }, [src]);

  React.useEffect(() => {
    const onload = function() {
      setSize({
        width: videoElement.videoWidth,
        height: videoElement.videoHeight
      });
    };
    videoElement.addEventListener("loadedmetadata", onload);
    return () => {
      videoElement.removeEventListener("loadedmetadata", onload);
    };
  }, [videoElement]);
  React.useEffect(() => {
    // videoElement.play();
    const layer = imageRef.current.getLayer();

    const anim = new Konva.Animation(() => {}, layer);
    anim.start();

    return () => {anim.stop();}
  }, [videoElement]);

  return (
    <>
    <Stage width={500} height={500}>
    <Layer>
        <Image
        ref={imageRef}
        image={videoElement}
        x={20}
        y={20}
        stroke="red"
        width={size.width}
        height={size.height}
        draggable
      />
    </Layer>
  </Stage> 
  <input
          value={src}
          onChange={event => setSrc(event.target.value)}
          placeholder={'Введите ссылку'}
        />
         <button onClick={() => videoElement.play()}> Play</button>
         <button onClick={() => videoElement.pause()}> Pause</button>
  </>
  )
};

export default App;

// https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4