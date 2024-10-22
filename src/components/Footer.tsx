import styled from "styled-components";
import ButtonVideo from "../shared/ui/ButtonVideo";

const StyledFooter = styled.div`
        display: flex;
        background: #21232a;
        color: white;
        width: 100wh;
        height: 330px;
        flex-direction: row;
        justify-content: center;
        font-size: 40pt;
        margin-top: 50px
    `;
    
const Footer = (props: any) => {
    return ( 
    <StyledFooter>
       <input type={"file"} accept={"video/mp4"} onChange={props.Change}/>
      <ButtonVideo text={"Play"} rf={props.rf}/>
      <ButtonVideo text={"Pause"} rf={props.rf}/>
    </StyledFooter> 
    );
}
 
export default Footer;