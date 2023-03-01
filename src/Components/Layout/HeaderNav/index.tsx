import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ColorList } from "../../../shared";
const navMap = {
  default: "/",
  log: "/log",
  point: "/point",
  info: "/info",
  album: "/album",
};
function HeaderNav() {
  const location = useLocation();
  return (
    <HeaderList>
      <li
        className={`${location.pathname === navMap["default"] ? "active" : ""}`}
      >
        <Link to={navMap["default"]}>입력</Link>
      </li>
      <li
        className={`${
          location.pathname.includes(navMap["point"]) ? "active" : ""
        }`}
      >
        <Link to="/point">포인트</Link>
      </li>
      <li
        className={`${
          location.pathname.includes(navMap["log"]) ? "active" : ""
        }`}
      >
        <Link to="/log">로그</Link>
      </li>
      <li
        className={`${
          location.pathname.includes(navMap["info"]) ? "active" : ""
        }`}
      >
        <Link to="/info">정보</Link>
      </li>
      <li
        className={`${
          location.pathname.includes(navMap["album"]) ? "active" : ""
        }`}
      >
        <Link to="/album">앨범</Link>
      </li>
    </HeaderList>
  );
}

export default HeaderNav;
const HeaderList = styled.ul`
  display: flex;
  /* border-bottom: 1px solid ${ColorList.black200}; */
  li {
    flex: 1;
    /* padding: 8px 0; */
    height: 42px;
    align-items: center;
    justify-content: center;
    display: flex;
    /* border-right: 1px solid ${ColorList.black200}; */
    &:last-of-type {
      border-right: 0;
    }
    a {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      color: ${ColorList.black900};
      position: relative;
    }
    &.active a::before {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 3px;
      background: ${ColorList.tomato350};
    }
  }
`;
