import React from "react";
import { Image, Transformer } from "react-konva";
import { IVideo } from "../entities/slices/videoSlice";
import Konva from "konva";

interface IVideoProps {
  video: HTMLVideoElement | undefined;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: IVideo) => void;
  videoProps: IVideo;
  visibleVideo: boolean
}
const Video = ({
  video,
  isSelected,
  onSelect,
  onChange,
  videoProps,
  visibleVideo
}: IVideoProps) => {
  const videoRef = React.useRef<Konva.Image>(null);
  const trRef = React.useRef<Konva.Transformer | null>(null);
  React.useEffect(() => {
    if (isSelected && trRef.current && videoRef.current) {
      trRef.current.nodes([videoRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);
  
  return (
    <>
      <Image
        key={video?.id}
        ref={videoRef}
        onClick={onSelect}
        onTap={onSelect}
        stroke={"black"}
        image={video}
        {...videoProps}
        visible={visibleVideo}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...videoProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          if (videoRef.current) {
            const node = videoRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...videoProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default Video;
