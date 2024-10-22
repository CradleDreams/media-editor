import { Layer, Stage} from "react-konva";
import { useState } from "react";
import React from "react";
import ButtonVideo from "../shared/ui/ButtonVideo";
import Video from "../components/Video";

function App() {
  const [src, setSrc] = useState<any>();
  const imageRef = React.useRef<any>();

  
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const file = new FileReader();

    file.onload = function () {
      setSrc(file.result);
    };

    file.readAsDataURL(target.files[0]);
    
  };

  React.useMemo(() => {
    const element = document.createElement("video");
    element.src = src;
    imageRef.current = element
    return element;
  }, [src, imageRef]);

  

  const handlePlay = () => {
    imageRef.current.getImage().play();
  };

  const handlePause = () => {
    imageRef.current.getImage().pause();
  };

  return (
    <>
      <Stage width={window.outerWidth} height={500}>
        <Layer>
          {src && (<Video ref={imageRef}/>)}
        </Layer>
      </Stage>
      <input type={"file"} accept={"video/mp4"} onChange={handleOnChange} />
      <ButtonVideo text={"Play"} func={handlePlay} />
      <ButtonVideo text={"Pause"} func={handlePause} />
    </>
  );
}

export default App;

// https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4