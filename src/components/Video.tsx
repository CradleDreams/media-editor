import Konva from "konva";
import { KonvaEventListener } from "konva/lib/Node";
import React from "react";
import {Image} from 'react-konva'

interface IVideoSetting {
  src: string,
  func: Function
}
const Video = ({src, func}: IVideoSetting) => {
  const imageRef = React.useRef<any>();
  const [size, setSize] = React.useState({ width: 50, height: 50 });

  // we need to use "useMemo" here, so we don't create new video elment on any render
  const videoElement = React.useMemo(() => {
    const element = document.createElement("video");
    element.src = src;
    return element;
  }, [src]);

  // when video is loaded, we should read it size
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

  // use Konva.Animation to redraw a layer
  React.useEffect(() => {
    func(videoElement)
    videoElement.play();
    const layer = imageRef.current.getLayer();

    const anim = new Konva.Animation(() => {}, layer);
    anim.start();

    return () => {anim.stop();}
  }, [videoElement]);

  return (
    <>
    <Image
      ref={imageRef!}
      image={videoElement}
      x={20}
      y={20}
      stroke="red"
      width={size.width}
      height={size.height}
      draggable
    />
    </>
  );
};

export default Video