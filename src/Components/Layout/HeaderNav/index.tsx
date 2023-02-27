import styled from "styled-components";
function HeaderNav() {
  return (
    <HeaderList>
      <li>입력</li>
      <li>log</li>
      <li>내정보</li>
      <li>album</li>
    </HeaderList>
  );
}

export default HeaderNav;
const HeaderList = styled.ul`
  display: flex;
  li {
    flex: 1;
  }
`;
