interface IButtonSetting{
    text: string,
    func: any,
}
const ButtonVideo = ({text, func}: IButtonSetting) => {
  return (
    <button onClick={func}>{text}</button>
  )
}

export default ButtonVideo;
