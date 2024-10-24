
import { Image } from "react-konva";

const Video = ((video: any) => {
  return (
    <Image
      stroke={"black"}
      image={video.video}
      width={500}
      height={300}
      draggable
    />
  );
});

export default Video;
