import styled from "styled-components";

const StyledHeader = styled.div`
        display: flex;
        background: #21232a;
        color: white;
        width: 100wh;
        flex-direction: row;
        justify-content: center;
        font-size: 40pt;
        margin-bottom: 50px;
    `;

const Header = () => {
    return (  
        <StyledHeader>
            Video editor
        </StyledHeader>
    );
}
 
export default Header;