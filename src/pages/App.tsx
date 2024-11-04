import { Layer, Rect, Stage } from "react-konva";
import { useEffect, useState } from "react";
import React from "react";
import Video from "../widgets/Video";
import Header from "../components/Header";
import ControlPanel from "../components/ControlPanel";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../entities/store";
import {
  createVideo,
  deleteVideo,
  IVideo,
  updateVideo,
} from "../entities/slices/videoSlice";
import { v4 as uuidv4 } from "uuid";
import { useTypedSelector } from "../shared/hooks/useTypedSelector";
import Konva from "konva";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [src, setSrc] = useState<string | ArrayBuffer | null>();
  const imageRef = React.useRef<HTMLVideoElement[]>([]);
  const layerRef = React.useRef<Konva.Layer>(null);
  const [selectedId, selectVideo] = React.useState<string | null>(null);
  const [visibleVideo, setVisibleVideo] = useState<boolean>(true)

  const checkDeselect = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectVideo(null);
    }
  };

  const { videos, time } = useTypedSelector((state) => state.videos.present);

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
    // eslint-disable-next-line array-callback-return

      const element = document.createElement("video");
      const id = uuidv4();
      element.setAttribute("id", id);
      element.currentTime = 0.001;
      element.muted = true
      if (src && !videos.find((el) => el.src === src)) {
        element.src = src.toString();
        imageRef.current.push(element);
        element.addEventListener('loadedmetadata', () => {
          dispatch(
            createVideo({
              id: id,
              src: src.toString(),
              x: 0,
              y: 0,
              width: 500,
              height: 300,
              duration: element.duration
            })
          );
        })
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);
  const delVideo = (e: KeyboardEvent) => {
    if (selectedId && e.keyCode === 8) {
      imageRef.current.find((key) => key.id === selectedId)?.pause();
      imageRef.current = imageRef.current.filter(
        (key) => key.id !== selectedId
      );
      dispatch(deleteVideo(selectedId));
    }
  };
  document.addEventListener("keydown", delVideo);

  useEffect(() => {
    const layer = layerRef.current;
    const anim = new Konva.Animation(() => {}, layer);
    anim.start();
    return () => {
      anim.stop();
    };
  }, []);

  useEffect(() => {
    imageRef.current.map((el) => (el.currentTime = time));
  }, [time]);

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
        <Layer ref={layerRef} x={window.innerWidth / 3.1} offsetY={-50}>
          <Rect width={500} height={300} fill={"black"} />
          {videos.map((video) => {
            const ref = imageRef.current.find((el) => el.id === video.id);
            return (
              <Video
                video={ref}
                videoProps={video}
                visibleVideo={visibleVideo}
                isSelected={video.id === selectedId}
                onSelect={() => {
                  selectVideo(video.id);
                }}
                onChange={(newAttrs: IVideo) => {
                  dispatch(updateVideo(newAttrs));
                }}
              />
            );
          })}
        </Layer>
      </Stage>
      <ControlPanel Change={handleOnChange} rf={imageRef} VisibleVideo={{visibleVideo, setVisibleVideo}}/>
    </>
  );
}

export default App;
