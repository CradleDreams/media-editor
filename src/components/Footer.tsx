import styled from "styled-components";
import { StyledButton } from "../shared/ui/ButtonVideo";

const StyledFooter = styled.div`
  display: flex;
  background: #21232a;
  color: white;
  width: 100wh;
  height: 330px;
  flex-direction: row;
  justify-content: center;
  font-size: 40pt;
  margin-top: 50px;
`;

const Footer = (props: any) => {
  const handlePlay = () => {
    props.rf.current.map((el: any) => {
      return el.play()
    })
  }
  const handlePause = () => {
    props.rf.current.map((el: any) => {
      return el.pause()
    })
  }
  return (
    <StyledFooter>
      <input type={"file"} accept={"video/mp4"} onChange={props.Change} />
          <StyledButton onClick={handlePlay}>
            Play
            <img
              src={`images/Play.svg`}
              style={{ width: 20, height: 20, color: "white" }}
              alt={"Картинка"}
            />
          </StyledButton>
          <StyledButton onClick={handlePause}>
            Pause
            <img
              src={`images/Pause.svg`}
              style={{ width: 20, height: 20, color: "white" }}
              alt={"Картинка"}
            />
          </StyledButton>
    </StyledFooter>
  );
};

export default Footer;
