import { Layer, Rect, Stage } from "react-konva";
import { useState } from "react";
import React from "react";
import Video from "../components/Video";
import Header from "../components/Header";
import Footer from "../components/Footer";


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
    imageRef.current = element;
    return element;
  }, [src, imageRef]);

  return (
    <>
    <Header/>
      <Stage width={window.innerWidth} height={300} visible={true}>
        <Layer width={500} height={300} x={window.innerWidth/3.1} draggable>
        <Rect width={500} height={300} fill={"black"}/>
          <Video ref={imageRef}/>
        </Layer>
      </Stage>
      <Footer Change={handleOnChange} rf={imageRef}/>
    </>
  );
}

export default App;

// https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4
