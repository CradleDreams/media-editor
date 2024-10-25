import { Layer, Rect, Stage } from "react-konva";
import { useEffect, useState } from "react";
import React from "react";
import Video from "../components/Video";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../entities/store";
import { createVideo, updateVideo } from "../entities/slices/video";
import { v4 as uuidv4 } from "uuid";
import { useTypedSelector } from "../shared/hooks/useTypedSelector";
import Konva from "konva";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [src, setSrc] = useState<any>();
  const imageRef = React.useRef<HTMLVideoElement[]>([]);
  const layerRef = React.useRef<Konva.Layer>(null);
  const [selectedId, selectVideo] = React.useState<any>(null);

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectVideo(null);
    }
  };

  const { videos } = useTypedSelector((state) => state.videos);

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

  useEffect(() => {
    const element = document.createElement("video");
    const id = uuidv4();
    element.setAttribute('id', id)
    element.src = src;
    if (src) {
      imageRef.current.push(element);
      dispatch(
        createVideo({
          id: id,
          src,
          x: 0,
          y: 0,
          width: 500,
          height: 300
        })
      );
    }
    
  }, [src, dispatch]);

  useEffect(() => {
    const layer = layerRef.current;
    const anim = new Konva.Animation(() => {}, layer);
    anim.start();
    return () => {
      anim.stop();
    };
  }, [layerRef]);

  return (
    <>
      <Header />
      <Stage
        width={window.innerWidth}
        height={400}
        visible={true}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer
          ref={layerRef}
    
          x={window.innerWidth / 3.1}
          offsetY={-50}
        >
          <Rect width={500} height={300} fill={"black"} />
          {videos.map((video) => {
            const ref = imageRef.current.find(
              (el) => el.id === video.id
            );
            let videoProps = videos.find((el) => el.id === video.id)
            return (
              <Video
                video={ref}
                ref={imageRef}
                videoProps={videoProps}
                isSelected={video.id === selectedId}
                onSelect={() => {
                  selectVideo(video.id);
                }}
                onChange={(newAttrs: any) => {
                  dispatch(updateVideo(newAttrs));
                }}
                
              />
            );
          })}
        </Layer>
      </Stage>
      <Footer Change={handleOnChange} rf={imageRef} />
    </>
  );
}

export default App;

// https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4
