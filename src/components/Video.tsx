import Konva from "konva";
import React from "react";
import {Image} from 'react-konva'

const Video = React.forwardRef((props: any, ref: any) => {
  
  React.useEffect(() => {
    const layer = ref.current.getLayer();

    const anim = new Konva.Animation(() => {}, layer);
    anim.start();
    return () => {anim.stop();}
  }, [ref]);
  return (
    <Image
        ref={ref}
        stroke={"black"}
        image={ref.current}
        width={500}
        height={300}
        draggable
      />
  );
});

export default Video