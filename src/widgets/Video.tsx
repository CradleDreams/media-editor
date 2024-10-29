import React from "react";
import { Image, Transformer } from "react-konva";
import { IVideo } from "../entities/slices/videoSlice";

interface IVideoProps {
  video: HTMLVideoElement | undefined;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: IVideo) => void;
  videoProps: IVideo;
}
const Video = ({
  video,
  isSelected,
  onSelect,
  onChange,
  videoProps,
}: IVideoProps) => {
  const videoRef = React.useRef<any>();
  const trRef = React.useRef<any>();
  const onKeyDown = (e: any) =>{
    console.log(e);
    }
  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([videoRef.current]);
      trRef.current.getLayer().batchDraw();
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
        draggable
        onDragEnd={(e) => {
          onChange({
            ...videoProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onKeyDown={onKeyDown}
        onTransformEnd={(e) => {
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
        }}
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