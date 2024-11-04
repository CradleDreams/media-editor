import styled from "styled-components";
import { StyledButton } from "../shared/ui/ButtonVideo";
import { ActionCreators } from "redux-undo";
import { AppDispatch, store } from "../entities/store";
import { useTypedSelector } from "../shared/hooks/useTypedSelector";
import { StyledIcon } from "../shared/ui/Icon";
import WaveVideo from "../widgets/WaveVideo";
import { WaveList } from "../shared/ui/WaveList";
import { ButtonList } from "../shared/ui/ButtonList";
import { useEffect, useState } from "react";
import { SelectArea } from "../shared/ui/SelectArea";
import { useDispatch } from "react-redux";
import { updateVideo } from "../entities/slices/videoSlice";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const StyledFooter = styled.div`
  display: flex;
  background: #1b232b;
  color: white;
  width: 100wh;
  height: 330px;
  flex-direction: column;
  font-size: 40pt;
`;
interface IVisibleVideo {
  visibleVideo: boolean;
  setVisibleVideo: (visibleVideo: boolean) => void;
}
interface IControlPanelProps {
  Change: (e: React.FormEvent<HTMLInputElement>) => void;
  rf: React.MutableRefObject<HTMLVideoElement[]>;
  VisibleVideo: IVisibleVideo;
}

export interface IWaveSurferInstance {
  media: HTMLAudioElement;
  play: () => void;
  pause: () => void;
  setTime: (time: number) => void;
  getMuted: () => boolean;
  setMuted: (muted: boolean) => void;
}

interface ICutWaveProps {
  duration: number, 
  index: number
}

const ControlPanel = (props: IControlPanelProps) => {
  const [wavesurfer, setWavesurfer] = useState<IWaveSurferInstance[]>([]);
  const [leftSelect, setLeftSelect] = useState<number>(0);
  const [rightSelect, setRightSelect] = useState<number>(0);
  const [selectSide, setSelectSide] = useState<string>("");
  const [selectWs, setSelectWs] = useState<ICutWaveProps>();

  const pastStateHistory = useTypedSelector((state) => state.videos.past);
  const futureStateHistory = useTypedSelector((state) => state.videos.future);

  const dispatch = useDispatch<AppDispatch>();

  const { videos, time } = useTypedSelector((state) => state.videos.present);
  const handlePlay = () => {
    props.rf.current.map((el: HTMLVideoElement) => {
      // const videoProps = videos.find((video) => video.id === el.id)
      // el.currentTime = videoProps?.currentTime
      return el.play();
    });
    // eslint-disable-next-line array-callback-return
    wavesurfer.map((el) => {
      if (!el.media.error) {
        // const videoProps = videos.find((video) => Math.round(video.duration) === Math.round(el.media.duration))
        // el.media.currentTime = videoProps?.currentTime
        return el.play();
      }
    });
  };
  const handlePause = () => {
    props.rf.current.map((el: HTMLVideoElement) => {
      return el.pause();
    });
    // eslint-disable-next-line array-callback-return
    wavesurfer.map((el) => {
      if (!el.media.error) {
        return el.pause();
      }
    });
  };

  const handleMuted = () => {
    // eslint-disable-next-line array-callback-return
    wavesurfer.map((el) => {
      if (!el.media.error) {
        return el.setMuted(!el.getMuted());
      }
    });
  };

  const handleInvisible = () => {
    props.VisibleVideo.setVisibleVideo(!props.VisibleVideo.visibleVideo);
  };
  useEffect(() => {
    wavesurfer.map((el) => {
      return el.setTime(time);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  const onReady = (ws: IWaveSurferInstance) => {
    setWavesurfer([...wavesurfer, ws]);
  };

  const formatTime = (time: number) => {
    const minutes = Math.round(time / 60);
    const seconds = Math.round(time % 60);
    return `${minutes >= 10 ? minutes : "0".concat(minutes.toString())}:${
      seconds >= 10 ? seconds : "0".concat(seconds.toString())
    }`;
  };
  const selectTimeSlice = (e: IWaveSurferInstance) => {
    const index = wavesurfer.findIndex((el) => el.media === e.media);
    setSelectWs({duration: e.media.duration, index: index});
    if (
      selectSide === "left" &&
      (e.media.currentTime < rightSelect || !rightSelect)
    ) {
      setLeftSelect(e.media.currentTime);
    }
    if (selectSide === "right" && e.media.currentTime > leftSelect) {
      setRightSelect(e.media.currentTime);
    }
  };
  const selectSlice = async (e: KeyboardEvent) => {
    if (e.keyCode === 65) {
      setSelectSide("left");
    }
    if (e.keyCode === 68) {
      setSelectSide("right");
    }
    if (e.keyCode === 8) {
      if ((leftSelect || rightSelect) && selectWs) {
        const ffmpeg = new FFmpeg();
        await ffmpeg.load();
        await ffmpeg.writeFile("input.mp4", await fetchFile(videos[selectWs.index].src));
        await ffmpeg.exec([
          "-i",
          "input.mp4",
          "-ss",
          leftSelect.toString(),
          "-to",
          rightSelect ? rightSelect.toString() : selectWs.duration.toString(),
          "-c",
          "copy",
          "output.mp4",
        ]);

        const fileData = await ffmpeg.readFile("output.mp4");
        const file = new FileReader();

        file.onload = function () {
          if (file.result) {
            dispatch(
              updateVideo({ ...videos[0], src: file.result.toString() })
            );
            setSelectSide("");
            setLeftSelect(0);
            setRightSelect(0);
          }
        };

        const data = new Uint8Array(fileData as ArrayBuffer);
        const url = new Blob([data.buffer], { type: "video/mp4" });
        file.readAsDataURL(url);
      }
    }
  };
  document.addEventListener("keyup", selectSlice);

  const handleCheck = async () => {};
  return (
    <StyledFooter>
      <ButtonList>
        <SelectArea>
          {formatTime(leftSelect)} / {formatTime(rightSelect)}
        </SelectArea>
        <input
          type={"file"}
          accept={"video/mp4"}
          multiple
          onChange={props.Change}
          style={{ height: 25 }}
        />
        <button onClick={handleCheck}>Check</button>
        <StyledButton onClick={handleMuted} style={{ width: 50 }}>
          <StyledIcon src={`images/muted.svg`} alt={"muted"} />
        </StyledButton>
        <StyledButton onClick={handleInvisible} style={{ width: 50 }}>
          <StyledIcon src={`images/invisible.svg`} alt={"invisible"} />
        </StyledButton>
        <StyledButton onClick={handlePlay}>
          Play
          <StyledIcon src={`images/Play.svg`} alt={"play"} />
        </StyledButton>
        <StyledButton onClick={handlePause}>
          Pause
          <StyledIcon src={`images/Pause.svg`} alt={"pause"} />
        </StyledButton>
        <StyledButton
          onClick={() => store.dispatch(ActionCreators.undo())}
          disabled={!pastStateHistory.length}
        >
          <StyledIcon src={`images/undo.svg`} alt={"play"} />
        </StyledButton>
        <StyledButton
          onClick={() => store.dispatch(ActionCreators.redo())}
          disabled={!futureStateHistory.length}
        >
          <StyledIcon src={`images/redo.svg`} alt={"play"} />
        </StyledButton>
      </ButtonList>
      <WaveList>
        {videos.map((video, index) => {
          return (
            <WaveVideo
              key={index}
              src={video.src}
              handlePlay={handlePlay}
              handlePause={handlePause}
              onReady={onReady}
              waveWidth={video.duration}
              selectTimeSlice={selectTimeSlice}
            />
          );
        })}
      </WaveList>
    </StyledFooter>
  );
};

export default ControlPanel;
