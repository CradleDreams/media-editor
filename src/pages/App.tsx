import {Layer, Stage} from "react-konva";
import Video from "../components/Video";
import { useState } from "react";
import ButtonVideo from "../shared/ui/ButtonVideo";

function App() {
  const [src, setSrc] = useState('')
  const [video, setVideo] = useState()
  return (
    <>
    <Stage width={300} height={300}>
    <Layer>
      {src !== '' ? (
      <Video src={src} func={setVideo}/>
    ): <></>}
    </Layer>
  </Stage> 
  <input
          value={src}
          onChange={event => setSrc(event.target.value)}
          placeholder={'Введите ссылку'}
        />
         <ButtonVideo text="Play" ref={video}/>
  </>
  )
};

export default App;

// https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4