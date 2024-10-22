import styled from "styled-components";

interface IButtonSetting{
    text: string,
    rf: any,
}
const StyledButton = styled.button`
display: flex;
color: black;
width: 85px;
height: 25px;
border-radius: 30px;
flex-direction: row;
justify-content: center;
font-size: 13pt;
`;
const ButtonVideo = ({text, rf}: IButtonSetting) => {
  const handleClick = () => {
    text === "Play" ? rf.current.play() : rf.current.pause()
  }
  return (
    <StyledButton onClick={handleClick}><p>{text}</p><img src={`images/${text}.svg`} style={{width: 20, height: 20, color: "white"}} alt={'Картинка'}/></StyledButton>
  )
}

export default ButtonVideo;
