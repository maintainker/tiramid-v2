import styled from "styled-components";
import { ColorList } from "../../shared";

function Info() {
  return (
    <Container>
      <header>올해의 내 승률</header>
      <ul className="info-container">
        <li>
          <span>경배 w:1, l:1, 승률:100%</span>
          <button>정보 확인</button>
        </li>
        <li>
          <span>경배 w:1, l:1, 승률:100%</span>
          <button>정보 확인</button>
        </li>
        <li>
          <span>경배 w:1, l:1, 승률:100%</span>
          <button>정보 확인</button>
        </li>
        <li>
          <span>경배 w:1, l:1, 승률:100%</span>
          <button>정보 확인</button>
        </li>
        <li>
          <span>경배 w:1, l:1, 승률:100%</span>
          <button>정보 확인</button>
        </li>
        <li>
          <span>경배 w:1, l:1, 승률:100%</span>
          <button>정보 확인</button>
        </li>
        <li>
          <span>경배 w:1, l:1, 승률:100%</span>
          <button>정보 확인</button>
        </li>
        <li>
          <span>경배 w:1, l:1, 승률:100%</span>
          <button>정보 확인</button>
        </li>
        <li>
          <span>경배 w:1, l:1, 승률:100%</span>
          <button>정보 확인</button>
        </li>
        <li>
          <span>경배 w:1, l:1, 승률:100%</span>
          <button>정보 확인</button>
        </li>
        <li>
          <span>경배 w:1, l:1, 승률:100%</span>
          <button>정보 확인</button>
        </li>
        <li>
          <span>경배 w:1, l:1, 승률:100%</span>
          <button>정보 확인</button>
        </li>
        <li>
          <span>경배 w:1, l:1, 승률:100%</span>
          <button>정보 확인</button>
        </li>
      </ul>
    </Container>
  );
}

export default Info;

const Container = styled.div`
  background: ${ColorList.black100};
  height: calc(100vh - 42px);
  font-size: 16px;
  padding: 0 20px;
  header {
    width: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 1.8em;
    padding: 20px 0;
  }
  .info-container {
    background: #fff;
    padding: 8px;
    display: flex;
    gap: 8px;
    flex-direction: column;
    height: calc(100vh - 139px);
    overflow: scroll;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`;
