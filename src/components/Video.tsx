import Konva from "konva";
import React from "react";
import {Image} from 'react-konva'

// interface IVideoSetting {
//   src: string,
//   ref: any
// }
const Video = React.forwardRef((props: any, ref: any) => {
  
  // const [size, setSize] = React.useState({ width: 200, height: 200 }); 

  // React.useEffect(() => {
  //   const onload = function() {
  //     setSize({
  //       width: ref.current.videoWidth,
  //       height: ref.current.videoHeight
  //     });
  //   };
  //   ref.current.addEventListener("loadedmetadata", onload);
  //   return () => {
  //     ref.current.removeEventListener("loadedmetadata", onload);
  //   };
  // }, [ref.current]);
  React.useEffect(() => {
    const layer = ref.current.getLayer();

    const anim = new Konva.Animation(() => {}, layer);
    anim.start();

    return () => {anim.stop();}
  }, [ref]);

  return (
    <Image
        ref={ref}
        image={ref.current}
        x={20}
        y={20}
        stroke="red"
        width={700}
        height={400}
        draggable
      />
  );
});

export default Video