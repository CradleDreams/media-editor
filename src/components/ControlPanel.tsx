import styled from "styled-components";
import { StyledButton } from "../shared/ui/ButtonVideo";
import { ActionCreators } from "redux-undo";
import { store } from "../entities/store";
import { useTypedSelector } from "../shared/hooks/useTypedSelector";
import { StyledIcon } from "../shared/ui/Icon";
import WaveVideo from "../widgets/WaveVideo";
import { WaveList } from "../shared/ui/WaveList";
import { ButtonList } from "../shared/ui/ButtonList";
import { useState } from "react";

const StyledFooter = styled.div`
  display: flex;
  background: #21232a;
  color: white;
  width: 100wh;
  height: 330px;
  flex-direction: column;
  font-size: 40pt;
`;

const ControlPanel = (props: any) => {
  const [wavesurfer, setWavesurfer] = useState<any>([]);

  const pastStateHistory = useTypedSelector((state) => state.videos.past);
  const futureStateHistory = useTypedSelector((state) => state.videos.future);

  const handlePlay = () => {
    props.rf.current.map((el: any) => {
      return el.play();
    });
    wavesurfer.map((el: any) => {
      return el.play();
    });
  };
  const handlePause = () => {
    props.rf.current.map((el: any) => {
      return el.pause();
    });
    wavesurfer.map((el: any) => {
      return el.pause();
    });
  };

  const onReady = (ws: any) => {
    setWavesurfer([...wavesurfer, ws]);
  };
  return (
    <StyledFooter>
      <ButtonList>
        <input
          type={"file"}
          accept={"video/mp4"}
          onChange={props.Change}
          style={{ height: 25 }}
        />
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
        {props.rf.current.map((video: any) => {
          return (
            <WaveVideo
              src={video.src}
              handlePlay={handlePlay}
              handlePause={handlePause}
              onReady={onReady}
              waveWidth={video.duration}
            />
          );
        })}
      </WaveList>
    </StyledFooter>
  );
};

export default ControlPanel;
