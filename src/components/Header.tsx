import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  background: #1b232b;
  color: white;
  width: 100wh;
  flex-direction: row;
  justify-content: center;
  font-size: 40pt;
  font-weight: 600;
`;

const Header = () => {
  return <StyledHeader>Video editor</StyledHeader>;
};

export default Header;
